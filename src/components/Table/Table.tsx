import React, {useEffect, useRef, useState} from "react";
import Delete from "../../assets/icon/delete.svg";
import Checkbox from "../Checkbox/Checkbox";
import Search from "../../assets/icon/search.svg"


interface Props {
    rowsPerPage: number;
    renderHead: (maxWidthColumns: number[]) => JSX.Element;
    renderBody: (item: any, index: number, maxWidthColumns: number[], checkbox: any) => JSX.Element;
    maxWidthTable: number;
    maxWidthColumns: number[];
    haveDelete: boolean;
    onDelete: any;
    search: boolean;
}

const Table = ({
                   rowsPerPage,
                   renderBody,
                   renderHead,
                   maxWidthTable,
                   maxWidthColumns,
                   haveDelete,
                   onDelete,
                   search,
                   ...props
               }: Props & Record<string, unknown>) => {

    const [data, setData]:any = useState(props.array);
    let copyData = data;
    const [currentPage, setCurrentPage] = useState(0);
    const [nameSearch, setNameSearch] = useState("");
    let arrChecked = data.length > 0 ?data.map((item: any, ind:any) => {
        return {id: ind, checked: false}
    }) : [{id: 0, checked: false}];
    let keysOfData = data.length > 0 ? Object.keys(data[0]) : null;
    const [checked, setChecked] = useState(arrChecked);
    const [itemsToDelete, setItemsToDelete]: any[] = useState([]);
    const [itemsChecked, setItemsChecked]: any[] = useState([...checked]);
    let totalPages: any[] = [];
    const copyTotalPages: any[] = [];
    for (let i = 1; i <= Math.ceil(data.length / 4); i++) {
        totalPages.push(i);
        copyTotalPages.push(i);
    }


    useEffect(()=>{
        setData(props.array);
        copyData = data;
        arrChecked = data.map((item: any, ind:any) => {
            return {id: ind, checked: false}
        });
        setChecked(arrChecked);
        setItemsChecked([...checked])
        keysOfData = data.length > 0 ? Object.keys(data[0]) : null;
        console.log("--------")
        console.log(arrChecked);
        console.log(props.array)
    },[props.array])


    const showData = () =>{
        if(search && nameSearch && nameSearch.trim()){
            let length = data.filter((i: any, ind:any) => {
                if (nameSearch && nameSearch.trim()) {
                    let obj:any = null;
                    keysOfData?.map((key:any,ind:any)=>{
                        if(typeof i[key] === 'string'){
                            if(i[key].toLowerCase().includes(nameSearch.toLowerCase())){
                                console.log("нашел1")
                                obj = i[key];
                            }
                        }else if(typeof i[key] === 'number'){
                            if(i[key].toString().toLowerCase().includes(nameSearch.toLowerCase())){
                                console.log("нашел2")
                                obj = i[key].toString();
                            }
                        }
                    })
                    return obj ? obj.toLowerCase().includes(nameSearch.toLowerCase()) : false;
                } else{
                    return i
                };
            }).length;

            copyData = data.filter((i: any, ind:any) => {
                if (nameSearch && nameSearch.trim()) {
                    let obj:any = null;
                    keysOfData?.map((key:any,ind:any)=>{
                        if(typeof i[key] === 'string'){
                            if(i[key].toLowerCase().includes(nameSearch.toLowerCase())){
                                console.log("нашел1")
                                obj = i[key];
                            }
                        }else if(typeof i[key] === 'number'){
                            if(i[key].toString().toLowerCase().includes(nameSearch.toLowerCase())){
                                console.log("нашел2")
                                obj = i[key].toString();
                            }
                        }
                    })
                    return obj ? obj.toLowerCase().includes(nameSearch.toLowerCase()) : false;
                } else{
                    return i
                };
            })

            if(length === 0) length++;

            let arr = [];
            for(let i = 1; i <= Math.ceil(length / 4);i++){
                arr.push(i);
            }
            totalPages = arr;

            return data.filter((i: any, ind:any) => {
                if (nameSearch && nameSearch.trim()) {
                    let obj:any = null;
                    keysOfData?.map((key:any)=>{
                        if(typeof i[key] === 'string'){
                            if(i[key].toLowerCase().includes(nameSearch.toLowerCase())){
                                console.log("нашел1")
                                obj = i[key];
                            }
                        }else if(typeof i[key] === 'number'){
                            if(i[key].toString().toLowerCase().includes(nameSearch.toLowerCase())){
                                console.log("нашел2")
                                obj = i[key].toString();
                            }
                        }
                    })
                    return obj ? obj.toLowerCase().includes(nameSearch.toLowerCase()) : false;
                } else{
                    totalPages = copyTotalPages;
                    return i
                };
            }).slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
                .map((item: any, index: number) => {
                    return renderBody(item, index, maxWidthColumns, getCheckbox(item,index));
                });
        }else{
            return data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
                .map((item: any, index: number) => {
                    return renderBody(item, index, maxWidthColumns, getCheckbox(item,index));
                })
        }
    }


    const renderCountItems = () => {
        if(search){
            return copyData.length < rowsPerPage + rowsPerPage * currentPage
                ? copyData.length
                : rowsPerPage + rowsPerPage * currentPage;
        }else return data.length < rowsPerPage + rowsPerPage * currentPage
            ? data.length
            : rowsPerPage + rowsPerPage * currentPage;
    };

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber - 1);
    };

    const getCheckbox = (item: any, index:any) => {

        const obj = itemsChecked.find((i: any) => i.id === index);
        const ind = itemsChecked.indexOf(obj);
        return haveDelete ?
            <Checkbox
                id={data.indexOf(item)}
                checked={itemsChecked[ind].checked}
                onChange={(e: any) => {
                    if (e.target.checked) {
                        let array = itemsToDelete;
                        array.push(item);
                        setItemsToDelete([...array]);
                        itemsChecked[ind].checked = true;
                    } else {
                        if (itemsToDelete.includes(item)) {
                            let array = itemsToDelete;
                            const index = array.indexOf(item);
                            array.splice(index, 1);
                            setItemsToDelete([...array]);
                            itemsChecked[ind].checked = false;
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
        <div className="container-table" style={{maxWidth: maxWidthTable}}>
            {
                search ? <div className="searching-container">
                    <img src={Search}/>
                    <input
                        placeholder="Search"
                        onChange={(e: any) => {
                            setNameSearch(e.target.value);
                            for(let i = 0; i <= checked.length -1; i++){
                                checked[i].checked = false;
                            }
                            setItemsToDelete([]);
                         }
                        }
                    />
                </div> : null
            }

            <div className="table-main">
                <div className="table-header">{renderHead(maxWidthColumns)}</div>
                <div className="table-body">
                    {data.length > 0 ? showData() : <div>Данных нет</div>}
                </div>
                <div className="pagination">
                    <div className="count-of-elements">
                        {`${renderCountItems()} of ${search && nameSearch && nameSearch.trim() ? copyData.length : data.length} items`}
                    </div>
                    <div className="pages">{renderPagination()}</div>
                    <div className="delete-btn">{haveDelete ?
                        <button
                            disabled={!(itemsToDelete.length !== 0)}
                            onClick={() => {
                                setData(data.filter((item: any) => !(itemsToDelete.includes(item))));
                                copyData = copyData.filter((item: any) => !(itemsToDelete.includes(item)));
                                setCurrentPage(0);
                                setItemsToDelete([]);
                                onDelete();
                            }
                            }>
                            <img src={Delete} alt={'icon'}/>
                            <div>{`Delete${itemsToDelete.length > 0 ? `(${itemsToDelete.length})` : ""}`}</div>
                        </button> : null}</div>
                </div>
            </div>
        </div>

    );
};

export default Table;