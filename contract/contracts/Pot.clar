
;; title: CrowdFundingCollective
;; version:
;; summary:
;; description:

;; traits
;;

;; token definitions
;; 

;; constants
;;

;; data vars
;;

;; data maps
;; DEPOSITS: containg mapping Account - Balance
(define-map deposits {account: principal} {balance: uint})

;; public functions
;; DEPOSITS: Deposit amount into contract (sender)
(define-public (deposit (amount uint))
  (begin
    (unwrap-panic (stx-transfer? amount tx-sender (as-contract tx-sender)))
    (let ((current-balance (get balance (map-get? deposits {account: tx-sender}))))
      (if (is-none current-balance)
        (map-set deposits {account: tx-sender} {balance: amount})
        (map-set deposits {account: tx-sender} {balance: (+ amount (unwrap-panic current-balance))}))
      (ok amount))))
  

;; read only functions
;; DEPOSITS: Get balance of account (sender)
(define-read-only (get-balance)
  (default-to u0 (get balance (map-get? deposits {account: tx-sender}))))


;; private functions
;;



