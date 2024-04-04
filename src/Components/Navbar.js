import React from 'react'
const Navbar = ({ searchQuery, handleSearch,setSearchQuery,tasks, setTasks ,navBg}) => {

    // Function to clear all tasks
    const clearAllTasks = () => {
        setTasks([]);
    };

    return (
        <>
            <nav className={`navbar navbar-expand-lg ${navBg ? 'fixed-top bg-light shadow' : ""}`} data-bs-theme="dark">
                <div className="container">
                    <a className="navbar-brand text-dark fw-bold me-5" href="/">
                        <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/laptop.svg"
                            alt="To-Do List"
                            width="100" height="50"
                            className="d-inline-block align-text-center"
                        />
                        <span className='heading__title me-1 fst-italic'>I-List</span>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Searchbar  */}
                    <form className="mx-md-auto mx-5  search-bar" role="search">
                        <div className="input-group">
                            <input type="text" className="search form-control" placeholder="Search" value={searchQuery}
                                onChange={handleSearch} />
                            <button className={`btn btn-reset d-${searchQuery.length > 0 ? 'block' : 'none' }`} type="reset" onClick={() => setSearchQuery('')} id="button-addon2">❌</button>
                            <button className="btn btn-search" type="button" id="button-addon2">🔍</button>
                        </div>
                    </form>
                    
                    {/* Tasks Clear button with Confirmation pop up */}
                    <button className="button btn-shape ms-auto me-5 my-3 text-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop" disabled={tasks.length > 0 ? false : true}>
                        <span>Clear All</span>
                    </button>

                </div>
            </nav>

            {/* Confirmation pop up for clear all tasks*/}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Confirmation</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are U Sure want to delete all tasks <br/>
                            <b>Note: U may loss all ur tasks</b>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success active" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-danger" onClick={clearAllTasks} data-bs-dismiss="modal">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar