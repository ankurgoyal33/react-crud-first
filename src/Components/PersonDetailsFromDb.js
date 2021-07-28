import React from "react";
import { DetailsList } from '@fluentui/react';
// import {Modal } from '@fluentui/react';
// import { DefaultButton, IconButton, IButtonStyles } from '@fluentui/react/lib/Button';

class PersonDetailsFromDb extends React.Component {
    // cancelIcon = { iconName: 'Cancel' };
    // const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    columns = [
        {
            key: 'column1',
            name: 'Profile Pic',
            fieldName: 'ProfilePic',
            minWidth: 70,
            maxWidth: 90,
        },
        {
            key: 'column2',
            name: 'First Name',
            fieldName: 'FirstName',
            minWidth: 70,
            maxWidth: 90,
        },
        {
            key: 'column3',
            name: 'Last Name',
            fieldName: 'LastName',
            minWidth: 70,
            maxWidth: 90,
        },
        {
            key: 'column4',
            name: 'Address',
            fieldName: 'Address',
            minWidth: 100,
            maxWidth: 120,
        },
        {
            key: 'column5',
            name: 'Phone',
            fieldName: 'Phone',
            minWidth: 70,
            maxWidth: 90,
        },
        {
            key: 'column6',
            name: 'Email',
            fieldName: 'Email',
            minWidth: 120,
            maxWidth: 200,
        },
        {
            key: 'column7',
            name: 'Edit & Delete',
            fieldName: 'EditDelete',
            minWidth: 70,
            maxWidth: 90,
            onRender: (item) => {
                return (
                    <div>
                        <button
                            onClick={() => {
                                // this.props.updateData(item.FirstName)
                                this.props.updating(item)
                            }}>
                            Update/Edit
                        </button>
                        <button
                            onClick={() => {
                                // this.props.deleteData(item._id)
                                if (window.confirm("Are you sure?")) {
                                    this.props.deleteData(item.Email)
                                }
                                // <Modal
                                //     isOpen={isModalOpen}
                                //     onDismiss={hideModal}
                                // >
                                //     <div >
                                //         <span>ALERT!!</span>
                                //         {/* <IconButton
                                //             styles={iconButtonStyles}
                                //             iconProps={cancelIcon}
                                //             ariaLabel="Close popup modal"
                                //             onClick={hideModal}
                                //         /> */}
                                //     </div>

                                //         <p>Are you sure?</p>
                                //         <button onClick={
                                //             ()=>{
                                //                 this.props.deleteData(item.FirstName)
                                //             }
                                //         } >
                                //             Yes
                                //             </button>
                                //         <button onClick={hideModal} >Cancel</button>
                                // </Modal>

                            }}>
                            Delete
                        </button>
                    </div>

                );
            }
        },
    ];

    render() {
        return (
            <div>
                <DetailsList
                    items={this.props.items || []}
                    columns={this.columns}
                />
            </div>

        );
    }
}

export default PersonDetailsFromDb;
