;; Pot Contract
(define-data-var users (list 20 principal) ())  ;; Assuming max 20 users for illustration

(define-data-var transactions (list 50 (tuple (user principal) (type (string-ascii 10)) (amount uint))) ()) ;; Assuming max 50 transactions for illustration


(define-public (join (user principal))
    (var-set users (append (var-get users) (list user)))
    ok
)

(define-public (deposit (amount int))
    (var-set transactions (append (var-get transactions) (list {user: tx-sender, type: "deposit", amount: amount})))
    ok
)

(define-public (withdraw (amount int))
    (var-set transactions (append (var-get transactions) (list {user: tx-sender, type: "withdraw", amount: amount})))
    ok
)

(define-public (get-state)
    (ok (var-get transactions))
)