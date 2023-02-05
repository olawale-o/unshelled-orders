const Pagination = ({ page, totalPages, setPage }) => {
  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      <span className="pagination__page">
        Page {page} of {totalPages}
      </span>
      <button
        className="pagination__button"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
