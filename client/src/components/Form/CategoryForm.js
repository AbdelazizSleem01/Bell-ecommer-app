import React from "react";
import '../../styles/AdminDashBoard.css'
const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit} className="create-field">
                <div className="mb-3 mt-3">
                    <input
                        type="text"
                        placeholder="Enter new category"
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

export default CategoryForm;