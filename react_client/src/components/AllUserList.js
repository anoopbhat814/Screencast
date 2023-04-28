import React from "react";


function AllUserList(){


    return(
        <>
        <h3 className='heading' style={{ marginTop: "20px" }}>All User List</h3><br />
        <table class="table table-success table-striped">
                <thead>
                    <tr>
                        <th >No</th>
                        <th >User Name</th>
                        <th>Email</th>
                        <th>Mobile</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Md Ali</td>
                        <td>ali@gmail.com</td>
                        <td>8630221258</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Pinku</td>
                        <td>pinku@gmail.com</td>
                        <td>7549972332</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Mohammad Ali</td>
                        <td>mdali@gmail.com</td>
                        <td>7549973339</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Md Ali</td>
                        <td>ali@gmail.com</td>
                        <td>8630221258</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Pinku</td>
                        <td>pinku@gmail.com</td>
                        <td>7549972332</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Mohammad Ali</td>
                        <td>mdali@gmail.com</td>
                        <td>7549973339</td>
                    </tr>

                </tbody>

            </table>

        
        </>
    )
}
export default AllUserList