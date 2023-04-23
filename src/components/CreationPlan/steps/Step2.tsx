import React from "react";
import Input from "../../Input/Input";
import Dropdown from "../../Dropdown/Dropdown";
import Button from "../../Button/Button";
import Plus from "../../../assets/icon/plus.svg";
import Delete from "../../../assets/icon/delete.svg";
import Edit from "../../../assets/icon/edit.svg";
import Copy from "../../../assets/icon/copy.svg";
import Table from "../../Table/Table";

const Step2 = () => {
    const arr = Array.from({length: 40}, (_, i) => ({
        id: i,
        discipline: "Java" + i,
        nameOfWork:"Syllabus",
        deadline:"01.01.2003",
        infoOnImplementation:"Executed",
        comment:"salam"
    }));
    return (
        <div className="step-component">
            <div className="years">2022-2023</div>
            <div className="inputs-step">
                <div style={{marginBottom:20}}>
                    <Dropdown
                        label="Name of the Discipline"
                        value="Select"
                        maxWidth={500}
                    >
                        <ul>
                            <li>No data</li>
                        </ul>
                    </Dropdown>
                </div>
                <div style={{marginBottom:20}}>
                    <Input maxWidth={500}
                           label="Name of the work"
                           placeholder="Syllabus / Method guidance"/>
                </div>
                <div style={{display: "flex", marginBottom:20}}>
                    <Input maxWidth={180}label="Deadlines" placeholder="End"/>
                    <div style={{width:20}}/>
                    <Dropdown maxWidth={300}
                              label="Information on implementation"
                              value="Select">
                        <ul>
                            <li>No data</li>
                        </ul>
                    </Dropdown>
                </div>
                <div style={{marginBottom:20}}>
                    <Input
                        label="Comments"
                        type="area"
                        maxWidth={500}
                    />
                </div>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <div style={{width: 144}}><Button className="'primaryButtonAdd'" icon={Plus} label="Add"/></div>
                    <div style={{width: 50}}/>
                    <div style={{width: 144}}><Button icon={Delete} label="Reset"/></div>
                </div>
            </div>
            <div>
                <Table
                    array={arr}
                    rowsPerPage={4}
                    maxWidthTable={1083}
                    maxWidthColumns={[250, 250, 100, 150, 150, 140]}
                    haveDelete={true}
                    onDelete={() => {
                        console.log("deleted");
                    }}
                    renderHead={(maxWidthColumns) => {
                        return <div>
                            <div style={{maxWidth: 50}}></div>
                            <div style={{maxWidth: maxWidthColumns[0]}}>Discipline</div>
                            <div style={{maxWidth: maxWidthColumns[1]}}>Name of work</div>
                            <div style={{maxWidth: maxWidthColumns[2]}}>Deadlines</div>
                            <div style={{maxWidth: maxWidthColumns[3]}}>Information on implementation</div>
                            <div style={{maxWidth: maxWidthColumns[4]}}>Comment</div>
                            <div style={{maxWidth: maxWidthColumns[5]}}></div>
                        </div>
                    }}
                    renderBody={(item, index, maxWidthColumns, checkbox) => {
                        return (
                            <div key={index}>
                                <div style={checkbox ? {maxWidth: 50} : {}}>{checkbox}</div>
                                <div style={{maxWidth: maxWidthColumns[0]}}>{item.discipline}</div>
                                <div style={{maxWidth: maxWidthColumns[1]}}>{item.nameOfWork}</div>
                                <div style={{maxWidth: maxWidthColumns[2]}}>{item.deadline}</div>
                                <div style={{maxWidth: maxWidthColumns[3]}}>{item.infoOnImplementation}</div>
                                <div style={{maxWidth: maxWidthColumns[4]}}>{item.comment}</div>
                                <div style={{maxWidth: maxWidthColumns[5]}}>
                                    <div style={{width: 54, marginRight: 10}}><Button className="secondaryButton"
                                                                                      icon={Edit}/></div>
                                    <div style={{width: 54}}><Button icon={Copy}/></div>
                                </div>
                            </div>
                        );
                    }}
                    search={true}/>
            </div>
        </div>
    )
}

export default Step2;