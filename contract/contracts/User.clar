;; Manager Contract

(define-data-var pots list (tuple (pot-id int) (pot-contract principal)))

(define-read-only (find-pot (pot-item (tuple (pot-id int) (pot-contract principal))) (target-id int))
    (is-eq target-id (get pot-id pot-item))
)

(define-public (create-pot)
    (let ((new-pot-id (+ (len (var-get pots)) 1)))
        (var-set pots (append (var-get pots) (list {pot-id: new-pot-id, pot-contract: tx-sender})))
        ok
    )
)



(define-public (join-pot (pot-id int))
    (let ((pot-details (filter find-pot (var-get pots) pot-id)))
        (if (not (is-none (element-at pot-details 0)))
            (contract-call? (get pot-contract (unwrap-panic (element-at pot-details 0))) join tx-sender)
            (err "Pot not found")
        )
    )
)

(define-public (request-transaction (pot-id int) (amount int))
    (let ((pot-details (filter find-pot (var-get pots) pot-id)))
        (if (not (is-none (element-at pot-details 0)))
            (contract-call? (get pot-contract (unwrap-panic (element-at pot-details 0))) request-transaction tx-sender amount)
            (err "Pot not found")
        )
    )
)