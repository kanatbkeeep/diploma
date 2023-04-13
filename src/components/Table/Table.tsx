import React, {useEffect, useState} from "react";

const Table = (props: any) => {
    const [currentPage, setCurrentPage] = useState(1);


    const arr = [
        {firstname: "Daniyar",lastname:"Myrzasary",middlename:"Timurylu",age:20},
        {firstname: "Daniyar",lastname:"Myrzasary",middlename:"Timurylu",age:20},
        {firstname: "Daniyar",lastname:"Myrzasary",middlename:"Timurylu",age:20},
        {firstname: "Daniyar",lastname:"Myrzasary",middlename:"Timurylu",age:20},
        {firstname: "Daniyar2",lastname:"Myrzasary",middlename:"Timurylu",age:20},
        {firstname: "Daniyar2",lastname:"Myrzasary",middlename:"Timurylu",age:20},
        {firstname: "Daniyar2",lastname:"Myrzasary",middlename:"Timurylu",age:20},
        {firstname: "Daniyar2",lastname:"Myrzasary",middlename:"Timurylu",age:20},
        {firstname: "Daniyar3",lastname:"Myrzasary",middlename:"Timurylu",age:20},
        {firstname: "Daniyar3",lastname:"Myrzasary",middlename:"Timurylu",age:20},
        {firstname: "Daniyar3",lastname:"Myrzasary",middlename:"Timurylu",age:20},
        {firstname: "Daniyar3",lastname:"Myrzasary",middlename:"Timurylu",age:20},
        {firstname: "Daniyar4",lastname:"Myrzasary",middlename:"Timurylu",age:20},
        {firstname: "Daniyar4",lastname:"Myrzasary",middlename:"Timurylu",age:20},
        {firstname: "Daniyar4",lastname:"Myrzasary",middlename:"Timurylu",age:20},

    ]


    let totalPages:any = [];
    for(let i = 1; i<=Math.ceil(arr.length/4);i++){
        totalPages.push(i);
    }

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Middlename</th>
                    <th>Age</th>
                </tr>
                </thead>
                <tbody>
                {
                    arr.slice(0+(currentPage*4),4+(currentPage*4)).map((item:any)=>{
                        return(
                            <tr>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.middlename}</td>
                                <td>{item.age}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
                <div>{
                    totalPages.map((item:any)=>{
                        return(
                            <button onClick={()=>{
                                 setCurrentPage(item-1);
                            }}>{item}</button>
                        )
                    })
                }</div>
            </table>
        </div>
    )

}

export default Table;