;; Request Contract

(define-data-var requests (list (tuple (user principal) (pot-id int) (type (string-ascii 10)) (amount int))) ())

(define-public (create-request (pot-id int) (type (string-ascii 10)) (amount int))
    (var-set requests (append (var-get requests) (list {user: tx-sender, pot-id: pot-id, type: type, amount: amount})))
    ok
)

(define-public (get-requests)
    (ok (var-get requests))
)