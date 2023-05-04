import "./pagination.css";

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage((current) => current - 1)}
        disabled={currentPage === 1}
        className="page previous"
      >
        Prev
      </button>
      {generatedPages.map((page) => (
        <div
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? "page active" : "page"}
          key={page}
        >
          {page}
        </div>
      ))}
      <button   
        onClick={() => setCurrentPage((current) => current + 1)}
        disabled={currentPage === pages}
      className="page next"
      >Next</button>
    </div>
  );
};

export default Pagination;
