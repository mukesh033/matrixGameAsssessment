import React from 'react';
import './App.css';

class MatrixGame extends React.Component {
    state = {
        noOfMatrixElement : '',
        noOfColouredBox : '',
        time : '',
        formValidationCheck : false,
        matrixElements : [],
        colouredBoxs : []
    }

    setMatrixElement = (e) => {
        this.setState({
            noOfMatrixElement : e.target.value
        })
    }

    setColoredBox = (e) => {
        this.setState({
            noOfColouredBox : e.target.value
        })
    }

    setTime = (e) => {
        this.setState({
            time : e.target.value
        })
    }

    formSubmit = () => {
        if(this.state.noOfMatrixElement == '' || this.state.noOfMatrixElement < 0 || this.state.noOfMatrixElement > 2000) {
            alert("Matrix Element should not be blank and less the 0 and greater then 2000")
            return false;
        }
        if(this.state.noOfColouredBox == '' || this.state.noOfColouredBox < 0 || this.state.noOfColouredBox > 4000000) {
            alert("Coloued box should not be blank and less the 0 and greater then 4000000")
            return false;
        }
        if(this.state.time == '' || this.state.time < 0 || this.state.time > 5) {
            alert("Time should not be blank and less the 0 and greater then 5 sec")
            return false;
        }
        this.setState({
            formValidationCheck : true
        })

        this.createMatrix(this.state.noOfMatrixElement)
    }

    createMatrix = n => {
        let _matrixArrayCount = [];
        let _itemCounter = 0;
        for(let i = 0; i < n; i++) {
            for(let j = 0; j < n; j++) {
                _matrixArrayCount.push(_itemCounter++)
            }
        }
        for(let item = 0; item < _matrixArrayCount.length; item++) {
            this.state.matrixElements.push({color:false})
        }
        this.setState({
            matrixElements: this.state.matrixElements
        })
        this.boxColoured(this.state.noOfColouredBox)
    }

    boxColoured = n => {
        let _colouredBoxs = [];
        for(let i = 0; i < n; i++) {
            _colouredBoxs.push(i);
            this.state.matrixElements[i].color = true;
        }
        this.setState({
            colouredBoxs : _colouredBoxs
        })
        this.setState({
            matrixElements: this.state.matrixElements
        })

        this.boxFillColoured()
    }

    colorInterval = null;
    boxFillColoured = () => {
        this.colorInterval = setInterval(() => {
            let tempColorItem = this.state.colouredBoxs;
            if(this.state.matrixElements.length) {
                for(let i = 0; i < this.state.matrixElements.length; i++) {
                    if(this.state.matrixElements[i].color == false) {
                        tempColorItem.push(i);
                        this.state.matrixElements[i].color = true;
                        break;
                    }
                }

                this.setState({
                    colouredBoxs: tempColorItem
                });
                this.setState({
                    matrixElements: this.state.matrixElements
                })
                if(this.state.colouredBoxs.length == this.state.matrixElements.length) {
                    clearInterval(this.colorInterval)
                    setTimeout(() => {
                        alert("Game End!! User loss the game!!")
                    })
                }
            }
        }, this.state.time * 1000)
    }

    boxClicked = (index) => {
        if(this.state.matrixElements[index].color == true) {
            this.state.matrixElements[index].color = false;
            this.state.colouredBoxs.pop()
            this.setState({
                colouredBoxs : this.state.colouredBoxs
            })
            this.setState({
                matrixElements: this.state.matrixElements
            });
            if(this.state.colouredBoxs.length == 0) {
                clearInterval(this.colorInterval)
                setTimeout(() => {
                    alert("Game End!! User Win the game!!")
                })
            }
        }
    }   


    render() {
        return (
            <div className="matrix_game">
                {
                    this.state.formValidationCheck == false ? (
                        <div className="user_form">
                            <h1>User Form</h1>
                            <div className="input_wrapper">
                                <label>No. of Matrix</label>
                                <input type="number" value={this.state.noOfMatrixElement} onChange={this.setMatrixElement} />
                            </div>
                            <div className="input_wrapper">
                                <label>No. of Coloured Box</label>
                                <input type="number" value={this.state.noOfColouredBox} onChange={this.setColoredBox} />
                            </div>
                            <div className="input_wrapper">
                                <label>Time to auto fill box(sec)</label>
                                <input type="number" value={this.state.time} onChange={this.setTime} />
                            </div>

                            <button type="button" onClick={this.formSubmit}>Submit</button>
                        </div>
                    ) : (
                        <div className="matrix_box_container">
                            {
                                this.state.matrixElements.length > 0 && this.state.matrixElements.map((item, index) => (
                                    <div key={index} className={item.color ? 'box_btn_wrapper active' : 'box_btn_wrapper'}>
                                        <button type="button" onClick={() => this.boxClicked(index)}> {index} </button> 
                                    </div>
                                ))
                            }
                           
                        </div>
                    )
                }
                

                

            </div>
        );
    }
    
}

export default MatrixGame;
