
import React, {useEffect, useState} from "react";

interface Props {
    data: any[];
    rowsPerPage: number;
    renderHead: () => JSX.Element;
    renderRow: (item: any, index: number) => JSX.Element;
}

const Table = ({data, rowsPerPage, renderRow, renderHead}: Props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState<number[]>([]);

    useEffect(() => {
        // Вычисляем количество страниц и создаем массив со значениями от 1 до n
        const pageCount = Math.ceil(data.length / rowsPerPage);
        const pagesArray = Array.from(Array(pageCount), (_, i) => i + 1);
        setTotalPages(pagesArray);
    }, [data, rowsPerPage]);

    const renderCountItems = () => {
        return data.length < rowsPerPage + rowsPerPage * currentPage
            ? data.length
            : rowsPerPage + rowsPerPage * currentPage;
    };

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber - 1);
    };

    const renderPagination = () => {
        // Определяем начальную и конечную страницу в зависимости от текущей страницы
        let startPage = Math.max(currentPage - 2, 0);
        let endPage = Math.min(startPage + 4, totalPages.length - 1);

        if (endPage - startPage < 4) {
            startPage = Math.max(endPage - 4, 0);
        }

        // Создаем массив с кнопками пагинации
        const pages = [];
        if (startPage > 0) {
            pages.push(
                <button key={1}
                        className={currentPage === 1 ? " pagination-btn active-pagination-btn" : "pagination-btn"}
                        onClick={() => handlePageClick(1)}>
                    1
                </button>,
                <span className="ellipsis" key={"ellipsis-start"}>...</span>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={totalPages[i]}
                    onClick={() => handlePageClick(totalPages[i])}
                    className={currentPage === i ? "pagination-btn active-pagination-btn" : "pagination-btn"}
                >
                    {totalPages[i]}
                </button>
            );
        }

        if (endPage < totalPages.length - 1) {
            pages.push(
                <span className="ellipsis" key={"ellipsis-end"}>...</span>,
                <button
                    className={currentPage === 10 ? "pagination-btn active-pagination-btn" : "pagination-btn"}
                    key={totalPages[totalPages.length - 1]}
                    onClick={() => handlePageClick(totalPages[totalPages.length - 1])}
                >
                    {totalPages[totalPages.length - 1]}
                </button>
            );
        }

        return pages;
    };

    return (
        <table>
            <thead>{renderHead()}</thead>
            <tbody>
            {data
                .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
                .map((item: any, index: number) => {
                    return renderRow(item, index);
                })}
            </tbody>
            <tfoot>
                     <div className="pagination">
                         <div className="count-of-elements">
                             {`${renderCountItems()} of ${data.length} items`}
                         </div>
                         <div>{renderPagination()}</div>
                     </div>
            </tfoot>
        </table>
    );
};

export default Table;