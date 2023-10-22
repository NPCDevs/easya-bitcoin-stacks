;; Clarity smart contract for tracking user deposits and withdrawals

;; Define data maps and variables

;; A map to store user balances
(define-map user-balances
  { user: principal }
  { balance: uint })

;; Define public functions

;; Deposit function
(define-public (deposit (amount uint))
  (let (
    (current-balance (default-to u0 (get balance (map-get? user-balances { user: tx-sender }))))
  )
    ;; Check if the deposit amount is valid (greater than 0)
    (asserts! (> amount u0) (err "Invalid deposit amount"))

    ;; Update the balance for the user
    (map-set user-balances
      { user: tx-sender }
      { balance: (+ current-balance amount) }
    )
    (ok amount)
  )
)

;; Withdraw function
(define-public (withdraw (amount uint))
  (let (
    (current-balance (default-to u0 (get balance (map-get? user-balances { user: tx-sender }))))
  )
    ;; Check if there's enough balance for the withdrawal
    (asserts! (>= current-balance amount) (err "Not enough balance"))

    ;; Update the balance for the user after withdrawal
    (map-set user-balances
      { user: tx-sender }
      { balance: (- current-balance amount) }
    )
    (ok amount)
  )
)

;; Get balance function
(define-read-only (get-balance (user principal))
  (match (map-get? user-balances { user: user })
    entry (ok (get balance entry))
    (err "User not found")
  )
)