import React, {useEffect, useRef, useState} from "react";
import Delete from "../../assets/icon/delete.svg";
import Checkbox from "../Checkbox/Checkbox";


interface Props {
    data: any[];
    rowsPerPage: number;
    renderHead: (maxWidthColumns: number[]) => JSX.Element;
    renderBody: (item: any, index: number, maxWidthColumns: number[], checkbox: any) => JSX.Element;
    maxWidthTable: number;
    maxWidthColumns: number[];
    haveDelete: boolean;
}

const Table = ({data, rowsPerPage, renderBody, renderHead, maxWidthTable, maxWidthColumns, haveDelete}: Props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages: any = [];
    const itemsToDelete: any[] = [];
    for (let i = 1; i <= Math.ceil(data.length / 4); i++) {
        totalPages.push(i);
    }


    const renderCountItems = () => {
        return data.length < rowsPerPage + rowsPerPage * currentPage
            ? data.length
            : rowsPerPage + rowsPerPage * currentPage;
    };

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber - 1);
    };

    const getCheckbox = (item: any) => {
        return haveDelete ?
            <Checkbox
                id={data.indexOf(item)}
                defaultChecked={itemsToDelete.includes(item)}
                onChange={(e:any) => {
                    if(e.target.checked){
                        itemsToDelete.push(item);
                        console.log(itemsToDelete)
                    }else{
                        if(itemsToDelete.includes(item)){
                            const index = itemsToDelete.indexOf(item);
                            itemsToDelete.splice(index,1);
                            console.log(itemsToDelete)
                        }
                    }

                }
                }
            />
            : null;
    }

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
        <div className="table-main" style={{maxWidth: maxWidthTable}}>
            <div className="table-header">{renderHead(maxWidthColumns)}</div>
            <div className="table-body">
                {data
                    .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
                    .map((item: any, index: number) => {
                        return renderBody(item, index, maxWidthColumns, getCheckbox(item));
                    })}
            </div>
            <div className="pagination">
                <div className="count-of-elements">
                    {`${renderCountItems()} of ${data.length} items`}
                </div>
                <div className="pages">{renderPagination()}</div>
                <div className="delete-btn">{haveDelete ?
                    <button>
                        <img src={Delete} alt={'icon'}/>
                        <div>Delete</div>
                    </button> : null}</div>
            </div>
        </div>
    );
};

export default Table;