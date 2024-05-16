import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';

function Label({ componentName, valueType, isProOnly }) {
  const content = (
    <span>
      <strong>{componentName}</strong> for {valueType} editing
    </span>
  );
}

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif', // Set the desired font family here
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, productName, orderAmount, productAmount, paymentProductCount, sellerAmount, sellerDiscount, sellerPointAmount) {
  return { name, productName, orderAmount, productAmount, paymentProductCount, sellerAmount, sellerDiscount, sellerPointAmount };
}

const rows = [
  createData('아마존-일본', '캡틴아메리카', '2,641,760', '13,978', '189', '0', '0', '0'),
  createData('아마존-일본', '캡틴아메리카', '126,160', '14,018', '9', '0', '0', '0'),
  createData('아마존-일본', '캡틴마블', '98,800', '14,114', '7', '0', '0', '0'),
  createData('아마존-일본', '엔트맨', '1,056,528', '18,536', '57', '0', '0', '0'),
  createData('아마존-일본', '닥터스트레인지', '2,216,451', '18,470', '120', '0', '0', '0'),
  createData('아마존-일본', '스파이더맨', '311,174', '15,559', '20', '0', '0', '0'),
  createData('아마존-일본', '상치', '91,200', '15,200', '6', '0', '0', '0'),
  createData('아마존-일본', '닥터스트레인지', '98,800', '14,114', '7', '0', '0', '0'),
  createData('아마존-일본', '완다비전', '1,056,528', '18,536', '57', '0', '0', '0'),
  createData('아마존-일본', '완다비전', '2,216,451', '18,470', '120', '0', '0', '0'),
  createData('아마존-일본', '완다비전', '2,641,760', '13,978', '189', '0', '0', '0'),
  createData('아마존-일본', '완다비전', '126,160', '14,018', '9', '0', '0', '0'),
];

const HamburgerCheckbox = () => {
  const [dateRange, setDateRange] = useState([null, null]); // DateRangePicker를 위한 상태 변수
  const [selectedView, setSelectedView] = useState([]);

  const handleViewChange = (event, newSelectedView) => {
    setSelectedView(newSelectedView);
  };

  const handleReset = () => {
    // 초기화 로직 구현
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
          상품 분석
        </Typography>
        <Card>
          <CardContent style={{ alignItems: 'center', display: 'flex' }}>
            <Typography variant="subtitle1" gutterBottom style={{ marginRight: '45px' }}>
              기간
            </Typography>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{ marginRight: '20px' }}>
              <Button variant="outlined">어제</Button>
              <Button>지난 7일</Button>
              <Button variant="outlined">지난 15일</Button>
            </ButtonGroup>

            <TextField
              id="start-date"
              label="Start Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginRight: '10px' }}
            />
            <div style={{ margin: '0 10px' }}>-</div>
            <TextField
              id="end-date"
              label="End Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginRight: '20px' }}
            />

            <DemoItem
              label={
                <Label
                  componentName="DateRangePicker"
                  valueType="date range"
                  isProOnly
                />
              }
              component="DateRangePicker"
              style={{ marginLeft: '10px' }} // 추가된 부분
            />
          </CardContent>

          <CardContent>
            <Typography variant="subtitle1" gutterBottom style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ marginRight: '30px', fontFamily: 'Roboto, sans-serif' }}>쇼핑몰</span>
              <Select
                displayEmpty
                defaultValue=""
                style={{ width: '150px', height: '42px', fontFamily: 'Roboto, sans-serif' }} // 글꼴 변경
              >
                <MenuItem value="" disabled style={{ fontFamily: 'Arial, sans-serif' }}> 전체
                </MenuItem>
              </Select>

              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <Button variant="contained" color="primary" onClick={handleReset} style={{ padding: '32px 41px' }}>
                  검색
                </Button>
              </div>
            </Typography>
            <DemoItem
              label={
                <Label
                  componentName="DateRangePicker"
                  valueType="date range"
                  isProOnly
                />
              }
              component="DateRangePicker"
            >
            </DemoItem>
            <Typography variant="subtitle1" gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
              분석 관점
              <ToggleButtonGroup
                value={selectedView}
                onChange={handleViewChange}
                aria-label="분석 관점 선택"
                style={{ marginLeft: '10px' }}
              >
                <ToggleButton value="전체">전체</ToggleButton>
                <ToggleButton value="카테고리 대">카테고리</ToggleButton>
                <ToggleButton value="상품">상품</ToggleButton>
              </ToggleButtonGroup>
              <Button variant="contained" color="primary" onClick={handleReset} style={{ marginLeft: 'auto', padding: '22px 34px' }}>
                초기화
              </Button>
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', alignItems: 'center' }}>
              <Checkbox />
              <span style={{ marginLeft: '5px' }}>금액 상세보기</span>
              <FontAwesomeIcon icon={faDownload} style={{ marginLeft: '5px' }} />
              <span style={{ marginLeft: '5px' }}>현재 데이터 다운로드</span>
              <FontAwesomeIcon icon={faDownload} style={{ marginLeft: '5px' }} />
              <span style={{ marginLeft: '5px' }}>원본 데이터 다운로드</span>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right">카테고리</StyledTableCell>
                    <StyledTableCell align="right">상품명</StyledTableCell>
                    <StyledTableCell align="right">주문 금액</StyledTableCell>
                    <StyledTableCell align="right">상품 금액(정가)</StyledTableCell>
                    <StyledTableCell align="right">결제 상품 수량</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.kategorie}</StyledTableCell>
                      <StyledTableCell align="right">{row.orderAmount}</StyledTableCell>
                      <StyledTableCell align="right">{row.productAmount}</StyledTableCell>
                      <StyledTableCell align="right">{row.paymentProductCount}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </>
    </ThemeProvider>
  );
};

export default HamburgerCheckbox;
