import React, { useEffect, useState } from "react";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CountDown from "../components/CountDown";
import SaleModal from "../components/SaleModal";

export default function AdminItemList() {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [stock, setStock] = useState([]); 
  const [modalOpen, setModalOpen] = useState(false); 
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null); 
  const [selectedPrice, setSelectedPrice] = useState(null); 
  const [selectedCost, setSelectedCost] = useState(null); 
  useEffect(() => {
    axios.get('/ft/item/list')
      .then(res => {
        setList(res.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    // 각 항목에 대한 iid 가져오기
    const itemIds = list.map(item => item.iid);
    // iid 배열을 사용하여 재고
    itemIds.forEach((iid, idx) => {
      axios.get(`/ft/item/detail/${iid}/em`)
        .then(response => {
          const { options, tags } = response.data;
          const formattedOptions = options ? options.map(option => ({
            ioid: option.ioid,
            option: option.option,
            stock: option.count, // 재고갯수
            count: 0, // 수량
            price: option.price, // 가격
          })) : [];
          // 인덱스 값 사용하여 올바른 위치에 재고 정보 설정
          setStock(prevStock => {
            const newStock = [...prevStock];
            newStock[idx] = formattedOptions;
            return newStock;
          });
          // 태그 설정
          const formattedTags = tags ? tags.map(tag => ({
            itid: tag.itid,
            tag: tag.tag,
          })) : [];
          // 각 항목에 대한 태그를 설정
          setTags(prevTags => {
            const newTags = [...prevTags];
            newTags[idx] = formattedTags;
            return newTags;
          });
        })
        .catch(err => console.log(err))
    });
  }, [list]);

  // 모달 열기 함수
  const openModal = (iid, price, cost) => {
    setModalOpen(true);
    setSelectedItemId(iid); // 선택된 항목의 iid 설정
    setSelectedPrice(price)
    setSelectedCost(cost)
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setModalOpen(false);
    setSelectedItemId(null); // 모달이 닫힐 때 선택된 항목의 iid 초기화
    setSelectedPrice(null)
    setSelectedCost(null)
    // 모달이 닫힐 때마다 새로운 데이터 가져오기
    axios.get('/ft/item/list')
      .then(res => {
        setList(res.data);
      })
      .catch(err => console.log(err));
  };

  // 아이템 삭제 함수
  const deleteItem = (iid) => {
    const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
    if (isConfirmed) {
      axios.delete(`/ft/item/delete/${iid}`)
        .then(res => {
          console.log(res.data);
          // 삭제된 아이템을 UI에서도 동적으로 제거
          setList(prevList => prevList.filter(item => item.iid !== iid));
        })
        .catch(err => {
          console.error('Error deleting item:', err);
        });
    }
  };
  
  return (
    <>
      <Button onClick={() => { navigate(`/admin/item/insert`) }}>아이템 추가</Button>
      <Grid container spacing={2}>
        {list.map((item, index) => (
          <Grid item xs={6} sm={6} md={6} lg={6} key={index}>
            <Paper style={{ padding: 20 }}>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '30%', paddingRight: 20 }} rowspan="2">
                      <img src={item.img1} alt={'img'} style={{ width: '100%', height: 160, cursor: 'pointer' }} onClick={() => { navigate(`/item/detail/${item.iid}`) }}/>
                    </td>
                    <td style={{ verticalAlign: 'top',  width: '40%' }}>
                      <Typography variant="h6" style={{ display: 'inline-block', lineHeight: '1.2', maxHeight: '2.4em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name || '\u00A0'}
                      </Typography>
                      <Typography variant="body2">제조사: {item.company || '\u00A0'}</Typography>
                      <Typography variant="body2">원가: {item.cost ? item.cost.toLocaleString() + '원' : '\u00A0'}</Typography>
                      <Typography variant="body2">정가: {item.price ? item.price.toLocaleString() + '원' : '\u00A0'}</Typography>
                      <Typography variant="body2">할인금액:
                        {item.salePrice !== 0 && item.salePrice && new Date(item.saleDate) > new Date() && (
                          <>{item.salePrice.toLocaleString()}원</>
                        )}
                      </Typography>
                      <Typography variant="body2">할인율:
                        {item.salePrice !== 0 && item.salePrice && new Date(item.saleDate) > new Date() && (
                          <>{((item.price - item.salePrice) / item.price * 100).toFixed()}%</>
                        )}
                      </Typography>
                      <Typography variant="body2">할인기간: {new Date(item.saleDate) > new Date() ? <CountDown saleDate={item.saleDate} /> : ''}</Typography>
                      <Typography variant="body2">평점: {item.totalSta / 10 + '점' || '\u00A0'}</Typography>
                    </td>
                    <td style={{ verticalAlign: 'top' }}>
                      <Typography variant="h6">재고</Typography>
                      {stock[index]?.map((opt, idx) => (
                        <Typography key={idx} variant="body2">{opt.option}: {(opt.stock === 0) ? '품절' : opt.stock+'개'}</Typography>
                      ))}
                     {tags[index]?.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        style={{ 
                          display: "inline-block",
                          borderRadius: "999px",
                          padding: "2px 8px",
                          marginRight: "5px",
                          fontSize: "0.7rem",
                          fontWeight: "bold",
                          color: "black",
                          backgroundColor: "lightgrey",
                          border: "1px solid grey",
                        }}
                        onClick={() => {}}
                      >
                        #{tag.tag}
                      </span>
                    ))}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Button variant="contained" color="primary" size="small" style={{ marginRight: 10 }} onClick={() => { navigate(`/admin/item/update/${item.iid}`) }}>수정</Button>
                      <Button variant="contained" color="primary" size="small" style={{ marginRight: 10 }} onClick={() => openModal(item.iid, item.price, item.cost)}>  세일</Button>
                      <Button variant="contained" color="secondary" size="small" onClick={() => deleteItem(item.iid)}>삭제</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {/* 모달 */}
      <SaleModal open={modalOpen} onClose={closeModal} iid={selectedItemId} price={selectedPrice} cost={selectedCost} /> 
    </>
  )
}
