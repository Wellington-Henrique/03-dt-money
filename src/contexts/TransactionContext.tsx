import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";


interface Transaction {
    id: number
    description: string
    type: "income" | 'outcome'
    price: number
    category: string
    createdAt: string
}


interface TransactionContextType {
    transactions: Transaction[]
    fetchTransactions: (query?: string) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContextType)

interface TransactionProviderProps {
    children: ReactNode,
}

export function TransactionsProvider({children}: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        fetchTransactions();
    }, [])

    async function fetchTransactions(query?: string) {
        const response = await api.get('Transactions', {
            params: {
                q: query
            }
        })

        setTransactions(response.data ?? [])
    }

    return(
        <TransactionsContext.Provider value={{transactions, fetchTransactions}}>
            {children}
        </TransactionsContext.Provider>
    )
}