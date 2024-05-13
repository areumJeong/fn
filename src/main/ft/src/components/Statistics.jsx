const HamburgerCheckbox = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
          기간
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button variant="outlined">어제</Button>
              <Button>지난 7일</Button>
              <Button variant="outlined">지난 15일</Button>
            </ButtonGroup>
          </div>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          쇼핑몰
          <Select
            displayEmpty
            defaultValue=""
            style={{ marginLeft: '10px', width: '200px' }}
          >
            <MenuItem value="" disabled>
              <em>전체</em>
            </MenuItem>
          </Select>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          분석 관점
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
      </CardContent>
    </Card>
  );
};

export default HamburgerCheckbox;
