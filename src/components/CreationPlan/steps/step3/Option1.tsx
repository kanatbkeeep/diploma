import React, {useState} from "react";
import Dropdown from "../../../Dropdown/Dropdown";
import t from "../../../../utils/Lang";
import Input from "../../../Input/Input";
import Button from "../../../Button/Button";
import Plus from "../../../../assets/icon/plus.svg";
import Delete from "../../../../assets/icon/delete.svg";

const Option1 = (props:any) => {
    const {planStore} = props;
    const [open, setOpen] = useState("");
    const [itemEdit, setItemEdit]: any = useState(null);

    const validation = () => {
        return (planStore.step3.typeWork && planStore.step3.journal && planStore.step3.deadline && planStore.step3.article
            && planStore.step3.infoImplementation);
    }

    const addObject = () => {
        const obj = {...planStore.step3};
        planStore.researchWorks.push(obj);
        planStore.editStep3Modal({
            typeWork:null,
            journal:"",
            deadline:"",
            article:"",
            infoImplementation:null,
            comment:"",
        })
    }

    const clear = () => {
        planStore.editStep3Modal({
            typeWork:null,
            journal:"",
            deadline:"",
            article:"",
            infoImplementation:null,
            comment:"",
        })
    }

    const copy = (item: any) => {
        planStore.editStep3Modal({...item});
    }

    const edit = (item: any) => {
        const ind = planStore.researchWorks.indexOf(item);
        planStore.researchWorks[ind] = {...planStore.step3}
        planStore.editStep3Modal({
            typeWork:null,
            journal:"",
            deadline:"",
            article:"",
            infoImplementation:null,
            comment:"",
        })
        setItemEdit(null);
    }
    return(
        <div>
            <div style={{marginBottom: 20, display: "flex"}}>
                <Input maxWidth={560}
                       label={t('nameArticle')}
                       value={planStore.step3.journal}
                       onChange={(e: any) => {
                           planStore.editStep3Modal({journal: e.target.value});
                       }
                       }
                />
                <div style={{marginRight: 55}}/>
                <Dropdown
                    onClick={() => {
                        if (open === "") {
                            setOpen("nameJournal");
                        } else {
                            setOpen("")
                        }
                    }}
                    open={open === "nameJournal"}
                    label={t('infoOnImplementation')}
                    value={planStore.step3.infoImplementation ? planStore.step3.infoImplementation.name: t('select')}
                    maxWidth={400}
                >
                    <ul>
                        {
                            planStore.infoImplementation.map((item: any) => {
                                return <li
                                    onClick={() => planStore.editStep3Modal({infoImplementation: item})}>{item.name}</li>
                            })
                        }
                    </ul>
                </Dropdown>
            </div>

            <div style={{marginBottom: 20, display: "flex"}}>
                <Input maxWidth={560}
                       label={t('coAuthors')}
                       value={planStore.step3.article}
                       onChange={(e: any) => {
                           planStore.editStep3Modal({article: e.target.value});
                       }
                       }
                />
            </div>

            <div style={{marginBottom: 20, display: "flex"}}>
                <Input maxWidth={140}
                       label={t('deadlines')}
                       value={planStore.step3.journal}
                       onChange={(e: any) => {
                           planStore.editStep3Modal({journal: e.target.value});
                       }
                       }
                />
                <div style={{marginRight: 55}}/>
                <Dropdown
                    onClick={() => {
                        if (open === "") {
                            setOpen("infoImpl");
                        } else {
                            setOpen("")
                        }
                    }}
                    open={open === "infoImpl"}
                    label={t('infoOnImplementation')}
                    value={planStore.step3.infoImplementation ? planStore.step3.infoImplementation.name: t('select')}
                    maxWidth={300}
                >
                    <ul>
                        {
                            planStore.infoImplementation.map((item: any) => {
                                return <li
                                    onClick={() => planStore.editStep3Modal({infoImplementation: item})}>{item.name}</li>
                            })
                        }
                    </ul>
                </Dropdown>
            </div>

            <div style={{marginBottom: 20}}>
                <Input
                    label={t('results')}
                    type="area"
                    maxWidth={500}
                    value={planStore.step3.comment}
                    onChange={(e: any) => {
                        planStore.editStep3Modal({comment: e.target.value});
                    }
                    }
                />
            </div>

            <div style={{marginBottom: 20}}>
                <Input
                    label={t('comments')}
                    type="area"
                    maxWidth={500}
                    value={planStore.step3.comment}
                    onChange={(e: any) => {
                        planStore.editStep3Modal({comment: e.target.value});
                    }
                    }
                />
            </div>

            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <div style={{width: 144}}>
                    <Button className="'primaryButtonAdd'"
                            icon={Plus}
                            label={itemEdit ? t('edit') : t('add')}
                            onClick={() => {
                                if (itemEdit) {
                                    edit(itemEdit);
                                } else {
                                    addObject();
                                }
                            }}
                            disabled={!(validation())}
                    />
                </div>
                <div style={{width: 50}}/>
                <div style={{width: 144}}>
                    <Button icon={Delete}
                            label={t('reset')}
                            onClick={() => {
                                clear()
                            }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Option1;