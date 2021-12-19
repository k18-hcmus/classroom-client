import React, { useEffect, useState } from 'react'
import axiosClient from 'src/axiosClient'
import { useParams, Redirect, useHistory } from 'react-router-dom'
import {
  Grid,
  Typography,
  Container,
  Button,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Avatar,
  Divider,
} from '@mui/material'
import Layout from '../../Layout/Layout'
import {
  DataGrid,
  GridToolbar,
  GridFilterMenuItem,
  SortGridMenuItems,
  GridColumnMenuContainer,
} from '@mui/x-data-grid'
import { styled } from '@mui/styles'
import { ArrowBackIosNew } from '@mui/icons-material'
import { NoDataIll } from 'src/_mocks_/Illustrations'
import accountDefault from 'src/_mocks_/account'
import _ from 'lodash'
import lodashGet from 'lodash/get'
import { useSnackbar } from 'notistack'
import NoDataDisplay from 'src/components/NoDataDisplay'
import LoadingPage from 'src/components/LoadingPage'
import MoreVertIcon from '@mui/icons-material/MoreVert'
const CustomCard = styled(Card)`
  &.sticky {
    position: sticky;
    top: 10px;
    z-index: 2;
  }
`
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color:
    theme.palette.mode === 'light'
      ? 'rgba(0,0,0,.85)'
      : 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-cell': {
    color:
      theme.palette.mode === 'light'
        ? 'rgba(0,0,0,.85)'
        : 'rgba(255,255,255,0.65)',
  },
}))
const ButtonMenuTable = styled(Button)({
  justifyContent: 'flex-start',
  color: '#000000',
})
function CustomColumnMenuComponent(props) {
  const { hideMenu, currentColumn } = props
  if (
    currentColumn.field === 'fullName' ||
    currentColumn.field === 'TotalGrade'
  ) {
    return (
      <GridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
      >
        <SortGridMenuItems onClick={hideMenu} column={currentColumn} />
        <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
      </GridColumnMenuContainer>
    )
  }
  return (
    <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn}>
      <Box
        sx={{
          width: 120,
          height: '100%',
        }}
      >
        <ButtonMenuTable fullWidth>Upload grades</ButtonMenuTable>
        <ButtonMenuTable
          name={currentColumn.field}
          onClick={props.handleReturnGrades}
          fullWidth
        >
          Return grades
        </ButtonMenuTable>
      </Box>
    </GridColumnMenuContainer>
  )
}
const DetailGrades = () => {
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [listGradeStudent, setListGradeStudent] = useState(null)
  const [users, setUsers] = useState(null)
  const [rows, setRows] = useState([])
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [columns, setColumns] = useState([
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 260,
      valueGetter: (params) => {
        const fisrtName = params.getValue(params.id, 'firstName')
        const lastName = params.getValue(params.id, 'lastName')
        if (!fisrtName && !lastName)
          return `${params.getValue(params.id, 'username')}`
        return `${fisrtName || ''} ${lastName || ''}`
      },
      renderCell: (params) => (
        <>
          <Avatar
            sx={{ width: 30, height: 30, mr: 1 }}
            src={
              params.getValue(params.id, 'picture')
                ? params.getValue(params.id, 'picture')
                : accountDefault.photoURL
            }
          ></Avatar>
          {params.value}
        </>
      ),
    },
  ])
  const handleReturnGrades = async (event) => {
    event.preventDefault()
    const fieldName = event.target.name
    const colGrades = rows.map((row) => {
      const { id } = row
      const point = row[fieldName]
      const grades = listGradeStudent.filter(
        (g) => g.name.split(' ').join('') === fieldName
      )
      return { userId: id, gradeId: grades[0].id, point: point }
    })
    try {
      const response = await axiosClient.post(
        `/api/classrooms/${id}/grades/${colGrades[0].gradeId}`,
        {
          colGrades,
        }
      )
      const updatedGrade = response.data.data
      updatedGrade.forEach((g) => {
        setRows((prev) =>
          prev.map((row) =>
            row.id === g.userId ? { ...row, [fieldName]: g.point } : row
          )
        )
      })
      updateTotalGrades(rows)
      enqueueSnackbar(response.data.message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }
  const goBack = () => {
    history.goBack()
  }
  const updateTotalGrades = (rows) => {
    rows.forEach((row) => {
      let totalGradeRow = 0
      for (const props in row) {
        if (
          props === 'firstName' ||
          props === 'lastName' ||
          props === 'picture' ||
          props === 'username' ||
          props === 'id' ||
          props === 'TotalGrade'
        ) {
          continue
        } else {
          totalGradeRow += row[props]
        }
      }
      setRows((prev) =>
        prev.map((r) =>
          r.id === row.id ? { ...r, TotalGrade: totalGradeRow } : r
        )
      )
    })
  }
  const handleCommitCell = async (params) => {
    const gradeEdited = listGradeStudent.filter(
      (g) => g.name.split(' ').join('') === params.field
    )
    if (params.value > gradeEdited[0].point) {
      setRows((prev) =>
        prev.map((row) =>
          row.id === params.id ? { ...row, [params.field]: null } : row
        )
      )
      enqueueSnackbar('Grade input out of total grade', { variant: 'error' })
      return
    }
    setRows((prev) =>
      prev.map((row) =>
        row.id === params.id ? { ...row, [params.field]: params.value } : row
      )
    )
    enqueueSnackbar('Set grade success, please Return Grades to update', {
      variant: 'success',
    })
  }
  const renderTableGrade = (rows) => (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <StyledDataGrid
            rows={rows}
            columns={columns}
            pageSize={rows.length}
            autoHeight={true}
            headerHeight={150}
            hideFooter
            density="compact"
            onCellEditCommit={handleCommitCell}
            sx={{ fontSize: '20px' }}
            components={{
              Toolbar: GridToolbar,
              ColumnMenu: CustomColumnMenuComponent,
            }}
            componentsProps={{
              columnMenu: { handleReturnGrades },
            }}
          />
        </div>
      </div>
    </div>
  )
  const createColTable = (g, editable) => {
    const col = {
      field: g.name.split(' ').join(''),
      headerName: g.name,
      type: 'number',
      minWidth: 150,
      editable: editable,
      renderHeader: (params) => (
        <>
          <Grid
            container
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '150px',
            }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography noWrap sx={{ mb: 0.5 }} variant="h5">
                {g.name}
              </Typography>
              <Divider />
            </Grid>
            <Grid item>
              <Typography noWrap variant="subtitle1">
                Total grade: {g.point}
              </Typography>
            </Grid>
          </Grid>
        </>
      ),
      renderCell: (params) => (
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            '& .point': {
              display: 'none',
            },
            '&:hover .point': {
              display: 'inline',
            },
          }}
        >
          {params.value}
          <span className="point">__/{g.point}</span>
        </Typography>
      ),
    }
    return col
  }
  const mapUser = [
    'User.id',
    'User.username',
    'User.firstName',
    'User.lastName',
    'point',
    'User.picture',
  ]
  let keymapUser = {
    'User.id': 'id',
    'User.username': 'username',
    'User.firstName': 'firstName',
    'User.lastName': 'lastName',
    'User.studentId': 'studentId',
    'User.picture': 'picture',
  }
  useEffect(() => {
    const getGradeDetail = async () => {
      try {
        const res = await axiosClient.get(`/api/classrooms/${id}/grades`)
        // Format user array
        res.data.forEach((grade, index) => {
          res.data[index].users = grade.users.map((user) =>
            _.pick(user, mapUser)
          )
        })
        //--------------------
        // Get all students in classroom
        const response = await axiosClient.get(`/api/classrooms/${id}/users`)
        const users = response.data.filter((user) => user.role === 'STUDENT')
        const listGradeStudent = res.data
        if (users && listGradeStudent) {
          let arrData = []
          let tempCol = []
          let totalGrade = { name: 'Total Grade', point: 0 }
          //Add grades field to column
          listGradeStudent.forEach((g) => {
            const temp = createColTable(g, true)
            tempCol.push(temp)
            totalGrade.point += g.point
          })
          //Add total grade column
          const temp = createColTable(totalGrade, false)
          tempCol.push(temp)
          //--------------
          users.forEach((user) => {
            let row = [
              _.mapKeys(_.pick(user, mapUser), function (v, k) {
                return keymapUser[k]
              }),
            ]
            //Total grade of student
            let totalGradeRow = 0
            listGradeStudent.forEach((g) => {
              const userFilter = g.users.filter(
                (u) => lodashGet(u, 'User.id') === user.userId
              )
              //Check student exist in array user
              if (userFilter.length > 0) {
                if (userFilter[0].point !== null) {
                  row[0][g.name.split(' ').join('')] = userFilter[0].point
                  totalGradeRow += userFilter[0].point
                } else {
                  row[0][g.name.split(' ').join('')] = null
                  totalGradeRow += 0
                }
              }
            })
            row[0][totalGrade.name.split(' ').join('')] = totalGradeRow
            arrData.push(row[0])
          })
          setRows(arrData)
          const col = columns.concat(tempCol)
          setColumns(col)
        }
        setListGradeStudent(listGradeStudent)
        setUsers(response.data.filter((user) => user.role === 'STUDENT'))
        setIsLoading(false)
      } catch (error) {
        enqueueSnackbar(error.message)
      }
    }
    getGradeDetail()
  }, [])
  return (
    <Layout>
      <Box
        sx={{
          mt: 2,
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CustomCard sx={{ minWidth: 1200 }} className={`sticky`}>
          <CardHeader
            avatar={
              <IconButton onClick={goBack}>
                <ArrowBackIosNew />
              </IconButton>
            }
            title={<Typography variant="h6">Grade Detail</Typography>}
          />
        </CustomCard>
      </Box>
      {isLoading ? (
        LoadingPage()
      ) : (
        <>
          {!rows.length
            ? NoDataDisplay({
                msgSuggest: 'Please check user list or grade structuce',
                photoURL: NoDataIll.photoURL,
                displayName: NoDataIll.displayName,
              })
            : renderTableGrade(rows)}
        </>
      )}
    </Layout>
  )
}

export default DetailGrades
