import React, {Component} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ReactTable from "react-table";
import 'react-table/react-table.css'

import data from './data.json'

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 9 * 2,
  margin: `0 9px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  justifyContent: 'center',
  padding: 9,
  overflow: 'auto',
});

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: {
        id: true,
        sex: true,
        firstname: true,
        lastname: true,
        city: true,
        wage: true,
        phone: true,
        date: true,
        children: true,
      },
      dataForTable: [],
      showToolbar: false,

    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  reRenderArray(columns) {
    this.setState({
      dataForTable : [
        {
          Header: "ID",
          accessor: "id",
          show: columns.id,
          // id: 1
        },
        {
          Header: "Sex",
          accessor: "sex",
          show: columns.sex,
          // id: 2
        },
        {
          Header: "First Name",
          accessor: "firstName",
          show: columns.firstname,
          // id: 3
        },
        {
          Header: "Last Name",
          accessor: "lastName",
          show: columns.lastname,
          // id: 4
        },
        {
          Header: "City",
          accessor: "city",
          show: columns.city,
          // id: 5
        },
        {
          Header: "Wage",
          accessor: "wage",
          show: columns.wage,
          // id: 6
        },
        {
          Header: "Phone",
          accessor: "phone",
          show: columns.phone,
          // id: 7
        },
        {
          Header: "Date",
          accessor: "date",
          show: columns.date,
          // id: 8
        },
        {
          Header: "Children",
          accessor: "children",
          show: columns.children,
          // id: 9
        }
      ]
    })
  }
  componentDidMount(){
    this.reRenderArray(this.state.columns)
  }
  handleInputChange(event,columns) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      columns: {
        ...columns,
        [name]: value
      }
    },()=>this.reRenderArray(this.state.columns));

  }
  renderToolbar() {
    const {columns}= this.state;
    return (
      <div style={{padding: 20}}>
        <form>
          <label style={{padding: 20}}>
            ID:
            <input
              name="id"
              type="checkbox"
              checked={columns.id}
              onChange={(e)=>this.handleInputChange(e,columns)}/>
          </label>
          <label style={{padding: 20}}>
            Sex:
            <input
              name="sex"
              type="checkbox"
              checked={columns.sex}
              onChange={(e)=>this.handleInputChange(e,columns)}/>
          </label>
          <label style={{padding: 20}}>
            Firstname:
            <input
              name="firstname"
              type="checkbox"
              checked={columns.firstname}
              onChange={(e)=>this.handleInputChange(e,columns)}/>
          </label>
          <label style={{padding: 20}}>
            Lastname:
            <input
              name="lastname"
              type="checkbox"
              checked={columns.lastname}
              onChange={(e)=>this.handleInputChange(e,columns)}/>
          </label>
          <label style={{padding: 20}}>
            City:
            <input
              name="city"
              type="checkbox"
              checked={columns.city}
              onChange={(e)=>this.handleInputChange(e,columns)}/>
          </label>
          <label style={{padding: 20}}>
            Wage:
            <input
              name="wage"
              type="checkbox"
              checked={columns.wage}
              onChange={(e)=>this.handleInputChange(e,columns)}/>
          </label>
          <label style={{padding: 20}}>
            Phone:
            <input
              name="phone"
              type="checkbox"
              checked={columns.phone}
              onChange={(e)=>this.handleInputChange(e,columns)}/>
          </label>
          <label style={{padding: 20}}>
            Date:
            <input
              name="date"
              type="checkbox"
              checked={columns.date}
              onChange={(e)=>this.handleInputChange(e,columns)}/>
          </label>
          <label style={{padding: 20}}>
            Children:
            <input
              name="children"
              type="checkbox"
              checked={columns.children}
              onChange={(e)=>this.handleInputChange(e,columns)}/>
          </label>
        </form>
      </div>
    );
  }
  reorder(list, startIndex, endIndex) {
    console.log(list, startIndex, endIndex)
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const dataForTable = this.reorder(
      this.state.dataForTable,
      result.source.index,
      result.destination.index
    );
    this.setState({
      dataForTable,
    });
  }

  render() {
    // { if(this.state.showToolbar)
    //     showToolbar = <Toolbar/>
    //   else showToolbar = null
    // }
    return (
      <div>
        <h5 onClick={()=>{this.showHide()}}>Show / hide columns</h5>
        {this.renderToolbar()}
        <h5 onClick={()=>{this.showHide()}}>Arrange columns</h5>
        {this.state.dataForTable &&
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.dataForTable.map((item, index) => item.show &&
                  <Draggable key={item.Header} draggableId={item.Header} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item.Header}
                      </div>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        }
        <ReactTable
          data={data}
          filterable={true}
          columns={[
            {
              Header: "Data from JSON",
              columns: this.state.dataForTable
                // .sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br/>
      </div>
    );
  }
  showHide =() => {
      this.setState({showToolbar: !this.state.showToolbar})
  }
}

export default Table;