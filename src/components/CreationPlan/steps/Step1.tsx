import React, {useEffect, useState} from "react";
import Input from "../../Input/Input";
import Dropdown from "../../Dropdown/Dropdown";
import Button from "../../Button/Button";
import Plus from "../../../assets/icon/plus.svg";
import Delete from "../../../assets/icon/delete.svg";
import Edit from "../../../assets/icon/edit.svg";
import Copy from "../../../assets/icon/copy.svg";
import Table from "../../Table/Table";
import {observer} from "mobx-react";

const Step1 = (props: any) => {
    const [open, setOpen] = useState("")

    const {planStore} = props;


    const validation = () =>{
        return (planStore.step1.nameDiscipline && planStore.step1.course && planStore.step1.trimester && planStore.step1.group
        && planStore.step1.lecturesPlan && planStore.step1.lecturesFact && planStore.step1.practicesPlan && planStore.step1.practicesFact
        && planStore.step1.hoursPlan && planStore.step1.hoursFact && planStore.step1.totalPlan && planStore.step1.totalFact);
    }

    // const arr = Array.from({length: 40}, (_, i) => ({
    //     id: i,
    //     discipline: "Java" + i,
    //     course: 3,
    //     trimester: 1,
    //     group: "SE-2014",
    //     lectures: {
    //         plan: 20,
    //         fact: i === 2 ? 25 : 20,
    //     },
    //     practices: {
    //         plan: 30,
    //         fact: 30,
    //     },
    //     officeHours: {
    //         plan: 10,
    //         fact: 10,
    //     },
    //     total: {
    //         plan: 60,
    //         fact: 60,
    //     }
    // }));

    const addObject = () => {
        const obj = {...planStore.step1};
        planStore.academWorks.push(obj);
        planStore.editStep1Modal({
            nameDiscipline: "",
            course: null,
            trimester: null,
            group: null,
            lecturesPlan: "",
            lecturesFact: "",
            practicesPlan: "",
            practicesFact: "",
            hoursPlan: "",
            hoursFact: "",
            totalPlan: "",
            totalFact: "",
        })
    }

    const clear = () => {
        planStore.editStep1Modal({
            nameDiscipline: "",
            course: null,
            trimester: null,
            group: null,
            lecturesPlan: "",
            lecturesFact: "",
            practicesPlan: "",
            practicesFact: "",
            hoursPlan: "",
            hoursFact: "",
            totalPlan: "",
            totalFact: "",
        })
    }


    return (
        <div className="step-component">
            <div className="years">2022-2023</div>
            <div className="inputs-step">
                <div style={{marginBottom: 20, display: "flex"}}>
                    <Input
                        maxWidth={500}
                        label="Name of the Discipline"
                        value={planStore.step1.nameDiscipline}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({nameDiscipline: e.target.value});
                        }
                        }
                    />
                    <div style={{width: 50}}/>
                    <Dropdown
                        onClick={() => {
                            if (open === "") {
                                setOpen("course");
                            } else {
                                setOpen("")
                            }
                        }}
                        open={open === "course"}
                        label="Course"
                        maxWidth={90}
                        value={planStore.step1.course ? planStore.step1.course.name : "Select"}
                    >
                        <ul>
                            {planStore.courses.map((item: any) => {
                                return <li onClick={() => {
                                    planStore.editStep1Modal({course: item});
                                }}>
                                    {item.name}
                                </li>
                            })}
                        </ul>
                    </Dropdown>
                    <div style={{width: 50}}/>
                    <Dropdown
                        onClick={() => {
                            if (open === "") {
                                setOpen("trimester");
                            } else {
                                setOpen("")
                            }
                        }}
                        open={open === "trimester"}
                        label="Trimester"
                        maxWidth={90}
                        value={planStore.step1.trimester ? planStore.step1.trimester.name : "Select"}
                    >
                        <ul>
                            {planStore.trimesters.map((item: any) => {
                                return <li onClick={() => {
                                    planStore.editStep1Modal({trimester: item})
                                }}>
                                    {item.name}
                                </li>
                            })}
                        </ul>
                    </Dropdown>
                    <div style={{width: 50}}/>
                    <Dropdown
                        onClick={() => {
                            if (open === "") {
                                setOpen("group");
                            } else {
                                setOpen("")
                            }
                        }}
                        open={open === "group"}
                        label="Group"
                        maxWidth={200}
                        value={planStore.step1.group ? planStore.step1.group.name : "Select"}
                    >
                        <ul>
                            {planStore.groups.map((item: any) => {
                                return <li onClick={() => {
                                    planStore.editStep1Modal({group: item})
                                }}>
                                    {item.name}
                                </li>
                            })}
                        </ul>
                    </Dropdown>
                </div>

                <div style={{marginBottom: 20, display: "flex"}}>
                    <Input
                        maxWidth={100}
                        label="Lectures"
                        placeholder="Plan"
                        value={planStore.step1.lecturesPlan}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({lecturesPlan: e.target.value});
                        }}
                    />
                    <div style={{width: 23}}/>
                    <Input
                        label="&nbsp;"
                        maxWidth={100}
                        placeholder="Fact"
                        value={planStore.step1.lecturesFact}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({lecturesFact: e.target.value});
                        }}
                    />
                    <div style={{width: 50}}/>
                    <Input
                        maxWidth={100}
                        label="Practices"
                        placeholder="Plan"
                        value={planStore.step1.practicesPlan}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({practicesPlan: e.target.value});
                        }}
                    />
                    <div style={{width: 23}}/>
                    <Input
                        label="&nbsp;"
                        maxWidth={100}
                        placeholder="Fact"
                        value={planStore.step1.practicesFact}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({practicesFact: e.target.value});
                        }}
                    />
                    <div style={{width: 50}}/>
                    <Input
                        maxWidth={100}
                        label="Office hours"
                        placeholder="Plan"
                        value={planStore.step1.hoursPlan}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({hoursPlan: e.target.value});
                        }}
                    />
                    <div style={{width: 23}}/>
                    <Input
                        label="&nbsp;"
                        maxWidth={100}
                        placeholder="Fact"
                        value={planStore.step1.hoursFact}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({hoursFact: e.target.value});
                        }}
                    />
                    <div style={{width: 50}}/>
                    <Input
                        maxWidth={100}
                        label="Total"
                        placeholder="Plan"
                        value={planStore.step1.totalPlan}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({totalPlan: e.target.value});
                        }}
                    />
                    <div style={{width: 23}}/>
                    <Input
                        label="&nbsp;"
                        maxWidth={100}
                        placeholder="Fact"
                        value={planStore.step1.totalFact}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({totalFact: e.target.value});
                        }}
                    />
                </div>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <div style={{width: 144}}>
                        <Button className="'primaryButtonAdd'"
                                icon={Plus}
                                label="Add"
                                onClick={()=> {
                                    addObject();
                                }}
                                disabled={!(validation())}
                        />
                    </div>
                    <div style={{width: 50}}/>
                    <div style={{width: 144}}>
                        <Button icon={Delete}
                                label="Reset"
                                onClick={()=>{
                                    clear()
                                }}
                        />
                    </div>
                </div>
            </div>
            <div>
                <Table
                    array={planStore.academWorks}
                    rowsPerPage={4}
                    maxWidthTable={1083}
                    maxWidthColumns={[250, 55, 100, 100, 100, 100, 100, 100, 128]}
                    haveDelete={true}
                    onDelete={() => {
                        console.log("deleted");
                    }}
                    renderHead={(maxWidthColumns) => {
                        return <div>
                            <div style={{maxWidth: 50}}></div>
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
                                <div style={checkbox ? {maxWidth: 50} : {}}>{checkbox}</div>
                                <div style={{maxWidth: maxWidthColumns[0]}}>{item.nameDiscipline}</div>
                                <div style={{maxWidth: maxWidthColumns[1]}}>{item.course.name}</div>
                                <div style={{maxWidth: maxWidthColumns[2]}}>{item.trimester.name}</div>
                                <div style={{maxWidth: maxWidthColumns[3]}}>{item.group.name}</div>
                                <div style={{maxWidth: maxWidthColumns[4]}}>
                                    <p style={{width: "100%", maxWidth: 50, color: "#003459"}}>{item.lecturesPlan}</p>
                                    <p style={{width: "100%", maxWidth: 50, color: "#007EA7"}}>{item.lecturesFact}</p>
                                </div>
                                <div style={{maxWidth: maxWidthColumns[5]}}>
                                    <p style={{width: "100%", maxWidth: 50, color: "#003459"}}>{item.practicesPlan}</p>
                                    <p style={{width: "100%", maxWidth: 50, color: "#007EA7"}}>{item.practicesFact}</p>
                                </div>
                                <div style={{maxWidth: maxWidthColumns[6]}}>
                                    <p style={{
                                        width: "100%",
                                        maxWidth: 50,
                                        color: "#003459"
                                    }}>{item.hoursPlan}</p>
                                    <p style={{
                                        width: "100%",
                                        maxWidth: 50,
                                        color: "#007EA7"
                                    }}>{item.hoursFact}</p>
                                </div>
                                <div style={{maxWidth: maxWidthColumns[7]}}>
                                    <p style={{width: "100%", maxWidth: 50, color: "#003459"}}>{item.totalPlan}</p>
                                    <p style={{width: "100%", maxWidth: 50, color: "#007EA7"}}>{item.totalFact}</p>
                                </div>
                                <div style={{maxWidth: maxWidthColumns[8]}}>
                                    <div style={{width: 54, marginRight: 10}}>
                                        <Button className="secondaryButton"
                                                icon={Edit}/>
                                    </div>
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

export default observer(Step1);