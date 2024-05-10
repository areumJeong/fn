import React from 'react';
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

  return (
    <div className="container">
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
              <StyledTableCell>쇼핑몰</StyledTableCell>
              <StyledTableCell align="right">상품명</StyledTableCell>
              <StyledTableCell align="right">주문 금액</StyledTableCell>
              <StyledTableCell align="right">상품 금액</StyledTableCell>
              <StyledTableCell align="right">결제 상품 수량</StyledTableCell>
              <StyledTableCell align="right">판매자 부담 금액</StyledTableCell>
              <StyledTableCell align="right">판매자 부담 할인액</StyledTableCell>
              <StyledTableCell align="right">판매자 부담 포인트 사용금액</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.productName}</StyledTableCell>
                <StyledTableCell align="right">{row.orderAmount}</StyledTableCell>
                <StyledTableCell align="right">{row.productAmount}</StyledTableCell>
                <StyledTableCell align="right">{row.paymentProductCount}</StyledTableCell>
                <StyledTableCell align="right">{row.sellerAmount}</StyledTableCell>
                <StyledTableCell align="right">{row.sellerDiscount}</StyledTableCell>
                <StyledTableCell align="right">{row.sellerPointAmount}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HamburgerCheckbox;
