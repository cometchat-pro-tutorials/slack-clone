import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";
export default class CreateGroup extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="modalcreate">
          <div id="open-modal" className="modal-window">
            <div>
              <Link to="#" title="Close" className="modal-close">
                Close
              </Link>
              <h1>Enter Group Name</h1>
              <form>
                <div>
                  <input className="groupname" />
                </div>
                <button className="button modalbutton">Create Group</button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
