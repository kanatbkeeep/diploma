import React from "react";
import Input from "../../Input/Input";
import Dropdown from "../../Dropdown/Dropdown";
import Button from "../../Button/Button";
import Plus from "../../../assets/icon/plus.svg";
import Delete from "../../../assets/icon/delete.svg";
import Edit from "../../../assets/icon/edit.svg";
import Copy from "../../../assets/icon/copy.svg";
import Table from "../../Table/Table";

const Step1 = () =>{
    const arr = Array.from({ length: 40 }, (_, i) => ({
        id:i,
        discipline: "Java"+i,
        course: 3,
        trimester: 1,
        group: "SE-2014",
        lectures:{
            plan:20,
            fact: i === 2 ? 25 : 20,
        },
        practices:{
            plan:30,
            fact:30,
        },
        officeHours:{
            plan:10,
            fact:10,
        },
        total:{
            plan:60,
            fact:60,
        }
    }));
    return(
        <div className="step-component">
            <div className="years">2022-2023</div>
            <div className="inputs-step">
                <div style={{marginBottom:20, display:"flex"}}>
                    <Input
                     maxWidth={500}
                     label="Name of the Discipline"
                    />
                    <div style={{width:50}}/>
                    <Dropdown
                        label="Course"
                        maxWidth={90}
                        value="Select"
                    >
                        <ul>
                            <li>Not found</li>
                        </ul>
                    </Dropdown>
                    <div style={{width:50}}/>
                    <Dropdown
                        label="Trimester"
                        maxWidth={90}
                        value="Select"
                    >
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                    </Dropdown>
                    <div style={{width:50}}/>
                    <Dropdown
                        label="Group"
                        maxWidth={200}
                        value="Select"
                    >
                        <ul>
                            <li>SE-2014</li>
                            <li>SE-2014</li>
                            <li>SE-2014</li>
                        </ul>
                    </Dropdown>
                </div>
                <div style={{marginBottom:20, display:"flex"}}>
                    <Input
                        maxWidth={100}
                        label="Lectures"
                        placeholder="Plan"
                    />
                    <div style={{width:23}}/>
                    <Input
                        label="&nbsp;"
                        maxWidth={100}
                        placeholder="Fact"
                    />
                    <div style={{width:50}}/>
                    <Input
                        maxWidth={100}
                        label="Lectures"
                        placeholder="Plan"
                    />
                    <div style={{width:23}}/>
                    <Input
                        label="&nbsp;"
                        maxWidth={100}
                        placeholder="Fact"
                    />
                    <div style={{width:50}}/>
                    <Input
                        maxWidth={100}
                        label="Lectures"
                        placeholder="Plan"
                    />
                    <div style={{width:23}}/>
                    <Input
                        label="&nbsp;"
                        maxWidth={100}
                        placeholder="Fact"
                    />
                    <div style={{width:50}}/>
                    <Input
                        maxWidth={100}
                        label="Lectures"
                        placeholder="Plan"
                    />
                    <div style={{width:23}}/>
                    <Input
                        label="&nbsp;"
                        maxWidth={100}
                        placeholder="Fact"
                    />
                </div>
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                    <div style={{width:144}}><Button className="'primaryButtonAdd'"icon={Plus} label="Add"/></div>
                    <div style={{width:50}}/>
                    <div style={{width:144}}><Button icon={Delete} label="Reset"/></div>
                </div>
            </div>
            <div>
                <Table
                    array={arr}
                    rowsPerPage={4}
                    maxWidthTable={1083}
                    maxWidthColumns={[250, 55, 100,100,100,100,100,100,128]}
                    haveDelete={true}
                    onDelete={()=>{
                        console.log("deleted");
                    }}
                    renderHead={(maxWidthColumns) => {
                        return <div>
                            <div style={{maxWidth:50}}></div>
                            <div style={{maxWidth: maxWidthColumns[0]}}>Discipline</div>
                            <div style={{maxWidth: maxWidthColumns[1]}}>Course</div>
                            <div style={{maxWidth: maxWidthColumns[2]}}>Trimester</div>
                            <div style={{maxWidth: maxWidthColumns[3]}}>Group</div>
                            <div style={{maxWidth: maxWidthColumns[4]}}>Lectures</div>
                            <div style={{maxWidth: maxWidthColumns[5]}}>Practices</div>
                            <div style={{maxWidth: maxWidthColumns[6]}}>Office Hours</div>
                            <div style={{maxWidth: maxWidthColumns[7]}}>Total</div>
                            <div style={{maxWidth: maxWidthColumns[8]}}></div>
                        </div>
                    }}
                    renderBody={(item, index, maxWidthColumns, checkbox) => {
                        return (
                            <div key={index}>
                                <div style={checkbox ? {maxWidth:50} : {}}>{checkbox}</div>
                                <div style={{maxWidth: maxWidthColumns[0]}}>{item.discipline}</div>
                                <div style={{maxWidth: maxWidthColumns[1]}}>{item.course}</div>
                                <div style={{maxWidth: maxWidthColumns[2]}}>{item.trimester}</div>
                                <div style={{maxWidth: maxWidthColumns[3]}}>{item.group}</div>
                                <div style={{maxWidth: maxWidthColumns[4]}}>
                                    <p style={{width:"100%",maxWidth:50, color: "#003459"}}>{item.lectures.plan}</p>
                                    <p style={{width:"100%",maxWidth:50, color: "#007EA7"}}>{item.lectures.fact}</p>
                                </div>
                                <div style={{maxWidth: maxWidthColumns[5]}}>
                                    <p style={{width:"100%",maxWidth:50, color: "#003459"}}>{item.practices.plan}</p>
                                    <p style={{width:"100%",maxWidth:50, color: "#007EA7"}}>{item.practices.fact}</p>
                                </div>
                                <div style={{maxWidth: maxWidthColumns[6]}}>
                                    <p style={{width:"100%",maxWidth:50, color: "#003459"}}>{item.officeHours.plan}</p>
                                    <p style={{width:"100%",maxWidth:50, color: "#007EA7"}}>{item.officeHours.fact}</p>
                                </div>
                                <div style={{maxWidth: maxWidthColumns[7]}}>
                                    <p style={{width:"100%",maxWidth:50, color: "#003459"}}>{item.total.plan}</p>
                                    <p style={{width:"100%",maxWidth:50, color: "#007EA7"}}>{item.total.fact}</p>
                                </div>
                                <div style={{maxWidth: maxWidthColumns[8]}}>
                                    <div style={{width:54, marginRight:10}}><Button className="secondaryButton" icon={Edit}/></div>
                                    <div style={{width:54}}><Button icon={Copy}/></div>
                                </div>
                            </div>
                        );
                    }}
                    search={true}/>
            </div>
        </div>
    )
}

export default Step1;