import React, { useState } from 'react'
import '../styles/Transactions.css'

export const Transactions = ({ transactions, selectedMonth }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage-1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  if (transactions === null || !Array.isArray(transactions)) {
    return <p>No transactions available</p>
  }

  const displayedTransactions = transactions.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (startIndex > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < transactions.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  return (
    <>
    <div className='table-w-pagination'>
    <table className="transaction-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
          <th>Category</th>
          <th>Sold</th>
          <th>Date of Sale</th>
        </tr>
      </thead>
      <tbody className='tbody'>
        {displayedTransactions.map(transaction => (
            <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.title}</td>
            <td>{transaction.price}</td>
            <td>{transaction.description}</td>
            <td>{transaction.category}</td>
            <td>{transaction.sold ? 'Yes' : 'No'}</td>
            <td>{transaction.dateOfSale}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage} disabled={endIndex >= transactions.length}>
          Next
        </button>
      </div>
    </div>
        </>
  )
}
