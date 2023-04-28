import React from "react";


function Dashboard(){

    return(
        <>
        <form>
              <div>
                  <label className='form-label'>Time Interval</label>
                  <input type="time" id="appt" name="appt" />
              </div>
              <div>
                <button>Subscription</button>
              </div>

            
        </form>
        
        </>
    )
}
export default Dashboard;