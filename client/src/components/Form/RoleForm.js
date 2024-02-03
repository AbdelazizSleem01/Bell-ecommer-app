import React from "react";
import '../../styles/AdminDashBoard.css'

const RoleForm = ({ handleSubmit, value, setValue, }) => {
    return (
        
        <>
            <form onSubmit={handleSubmit} className="create-field">
                <div className="mb-3 mt-3">
                    <input
                        type="text"
                        className=""
                        placeholder="Enter New Role ( Admin ) or ( User ) "
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                <button className="mt-4" type="submit">
                    Submit
                </button>
            </form>
        </>
    );
};

export default RoleForm;