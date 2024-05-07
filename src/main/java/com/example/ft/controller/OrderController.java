package com.example.ft.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ft.entity.Order;
import com.example.ft.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // 주문 1개 가져오기
    @GetMapping("/{oid}")
    public ResponseEntity<Order> getOrder(@PathVariable int oid) {
        try {
            // 클라이언트로부터 받은 주문 ID와 현재 로그인한 사용자의 이메일을 이용하여 주문 조회
            // 이메일 정보는 보안상의 이유로 세션 또는 토큰에서 가져오는 것이 바람직할 수 있습니다.
            String userEmail = "example@example.com"; // 현재 로그인한 사용자의 이메일 (임시)

            // 주문 조회
            Order order = orderService.getOrderByOid(oid);

            if (order != null) {
                // 주문이 존재하면 200 OK 상태 코드와 함께 주문 정보 반환
                return ResponseEntity.ok(order);
            } else {
                // 주문이 없으면 404 Not Found 상태 코드 반환
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // 예외 발생 시 500 Internal Server Error 상태 코드 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 주문한 것들 조회
    @GetMapping("/list/{email}")
    public ResponseEntity<List<Order>> getOrderById(@PathVariable String email) {
        try {
            List<Order> orders = orderService.getOrderListByEmail(email);
            if (orders != null && !orders.isEmpty()) {
                return ResponseEntity.ok(orders);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // 예외 발생 시 500 Internal Server Error 상태 코드 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 주문 생성
    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody Order order) {
        try {
            orderService.insertOrder(order);
            return ResponseEntity.status(HttpStatus.CREATED).body("주문이 성공적으로 생성되었습니다.");
        } catch (Exception e) {
            // 주문 생성에 실패한 경우, 에러 메시지와 함께 500 Internal Server Error 응답 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 생성에 실패했습니다.");
        }
    }
    
    
    
    
}