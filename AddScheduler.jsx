import React, { PureComponent, createRef } from 'react';
import moment from 'moment'

class AddScheduler extends PureComponent {

    state = {
        addAlert: false,
        alertType: false,
        timeError: false,
        dayError: false,
    }

    day = createRef()
    time = createRef()
    titleInput = createRef()
    addAlert = createRef()

    onClickAlertType = () => {
        this.setState(({
            alertType: true,
        }))
    }

    //propsHandiling
    onChangeTitle = (e) => {
        this.props.onChangeTitle(e)
        if (this.props.setTitle) {
            this.titleInput.current.style.border = '0'
            this.titleInput.current.placeholder = 'Title'
        }
    }

    onChangeYear = (e) => {
        this.props.onChangeYear(e)
    }

    onChangeMonth = (e) => {
        this.props.onChangeMonth(e)
    }

    onChangeDay = (e) => {
        this.props.onChangeDay(e)
        if (this.props.setDay <= moment().set({ 'year': Number(this.props.setYear), 'month': Number(this.props.setMonth - 1) }).endOf('month').date()) {
            this.setState(({
                dayError: false,
            }))
            this.day.current.style.border = '0'
        }
    }

    onChangeSHours = (e) => {
        this.props.onChangeSHours(e)
        if (Number(String(this.props.setEndHours) + String(this.props.setEndMinutes)) - Number(String(this.props.setStartHours) + String(this.props.setStartMinutes)) < 0) {
            this.setState(({
                timeError: false
            }))
            this.time.current.style.border = '0'
        }
    }

    onChangeSMinutes = (e) => {
        this.props.onChangeSMinutes(e)
        if (Number(String(this.props.setEndHours) + String(this.props.setEndMinutes)) - Number(String(this.props.setStartHours) + String(this.props.setStartMinutes)) < 0) {
            this.setState(({
                timeError: false
            }))
            this.time.current.style.border = '0'
        }
    }

    onChangeEHours = (e) => {
        this.props.onChangeEHours(e)
        if (Number(String(this.props.setEndHours) + String(this.props.setEndMinutes)) - Number(String(this.props.setStartHours) + String(this.props.setStartMinutes)) < 0) {
            this.setState(({
                timeError: false
            }))
            this.time.current.style.border = '0'
        }
    }

    onChangeEMinutes = (e) => {
        this.props.onChangeEMinutes(e)
        if (Number(String(this.props.setEndHours) + String(this.props.setEndMinutes)) - Number(String(this.props.setStartHours) + String(this.props.setStartMinutes)) < 0) {
            this.setState(({
                timeError: false
            }))
            this.time.current.style.border = '0'
        }
    }

    onChangeColor = (e) => {
        this.props.onChangeColor(e)
    }

    onChangeAlertTime = (e) => {
        this.props.onChangeAlertTime(e)
    }

    onClickMinutes = () => {
        this.setState(({
            alertType: false,
            setAlertType: 'minutes'
        }))
        this.props.onClickMinutes()
    }

    onClickHours = () => {
        this.setState(({
            alertType: false,
            setAlertType: 'hours'
        }))
        this.props.onClickHours()
    }

    onClickDays = () => {
        this.setState(({
            alertType: false,
            setAlertType: 'days'
        }))
        this.props.onClickDays()
    }

    onClickAddAlert = () => {
        if (!this.state.addAlert) {
            this.setState(({
                addAlert: true,
            }))
            this.addAlert.current.textContent = '--'
            this.props.onClickAddAlert()
        } else {
            this.setState(({
                addAlert: false,
            }))
            this.addAlert.current.textContent = '+'
            this.props.onClickRemoveAlert()
        }
    }

    onClickSubmit = () => {
        if (this.props.setTitle) {
            if (Number(String(this.props.setEndHours) + String(this.props.setEndMinutes)) - Number(String(this.props.setStartHours) + String(this.props.setStartMinutes)) > 0) {
                if (this.props.setDay <= moment().set({ 'year': Number(this.props.setYear), 'month': Number(this.props.setMonth - 1) }).endOf('month').date()) {
                    this.props.onClickSubmit()
                } else {
                    this.setState(({
                        dayError: true,
                    }))
                    this.day.current.style.border = '1px solid red'
                }
            } else {
                this.setState(({
                    timeError: true
                }))
                this.time.current.style.border = '1px solid red'
            }
        } else {
            this.titleInput.current.style.border = '4px solid red'
            this.titleInput.current.placeholder = 'There must be title'
            this.titleInput.current.style.backgroundColor = 'red'
            this.titleInput.current.style.color = 'white'
            setTimeout(() => {
                this.titleInput.current.style.backgroundColor = 'transparent'
                this.titleInput.current.style.color = 'black'
            }, 400)
        }
    }

    render() {
        return (
            <div className='scheduler'>
                <div className='scheduler-head'>
                    <input ref={this.titleInput} spellCheck='false' placeholder='Title' onChange={this.onChangeTitle}></input>
                </div>
                <div className='scheduler-body'>
                    <div style={{ marginBottom: '0' }} className='scheduler-body-time'>
                        <span style={{ float: 'left' }}>date</span>
                        <div style={{ marginLeft: '20px', float: 'left', }}>
                            <input max='12' min='1' type='number' value={this.props.setMonth} onChange={this.onChangeMonth}></input>/
                            <input ref={this.day} max={moment().set({ 'year': Number(this.props.setYear), 'month': Number(this.props.setMonth - 1) }).endOf('month').date()} min='1' type='number' value={this.props.setDay} onChange={this.onChangeDay}></input>/
                            <input max='9999' min='1' type='number' value={this.props.setYear} onChange={this.onChangeYear}></input>
                        </div>
                        {this.state.dayError && <div className='scheduler-day-error'><span>This setting have to be under {moment().set({ 'year': Number(this.props.setYear), 'month': Number(this.props.setMonth - 1) }).endOf('month').date() + 1}</span></div>}
                    </div>
                    <div ref={this.time} className='scheduler-body-time'>
                        <span style={{ float: 'left' }}>starts</span>
                        <div style={{ marginLeft: '26px', float: 'left' }}>
                            <input max='24' min='0' type='number' style={{ marginRight: '10px' }} value={this.props.setStartHours} onChange={this.onChangeSHours}></input>:
                            <input max='59' min='0' style={{ marginLeft: '10px', marginRight: '130px' }} type='number' value={this.props.setStartMinutes} onChange={this.onChangeSMinutes}></input>
                        </div>
                        <span style={{ float: 'left', marginRight: '6px' }}>ends</span>
                        <div style={{ marginLeft: '26px', float: 'left' }}>
                            <input max='24' min='0' type='number' style={{ marginRight: '10px' }} value={this.props.setEndHours} onChange={this.onChangeEHours}></input>:
                            <input max='59' min='0' style={{ marginLeft: '10px' }} type='number' value={this.props.setEndMinutes} onChange={this.onChangeEMinutes}></input>
                        </div>
                        {this.state.timeError && <div className='scheduler-time-error'><span>Start time must not be earlier than end time</span></div>}
                    </div>
                    <div className='scheduler-body-color'>
                        <span style={{ float: 'left' }}>display</span>
                        <input type='color' value={this.props.setColor} onChange={this.onChangeColor}></input>
                    </div>
                    <div className='scheduler-body-alert'>
                        <span style={{ fontWeight: '600', marginRight: '265px' }}>alert</span>
                        <span ref={this.addAlert} onClick={this.onClickAddAlert} style={{ cursor: 'pointer' }}>+</span>
                        <div style={{ height: '34px' }}>
                            <div style={{ position: 'relative', textAlign: 'center' }}>
                                {this.state.addAlert &&
                                    <>
                                        <input min='1' type='number' value={this.props.setAlertTime} onChange={this.props.onChangeAlertTime}></input>
                                        <span onClick={this.onClickAlertType} style={{ width: '60px', cursor: 'pointer' }}>{this.props.setAlertType}</span>
                                        {this.state.alertType &&
                                            <>
                                                <div onClick={this.onClickMinutes} style={{ border: '1px solid #e9e9e9', position: 'absolute', top: '15px', left: '123px', fontWeight: '100', cursor: 'pointer' }}>minutes</div>
                                                <div onClick={this.onClickHours} style={{ border: '1px solid #e9e9e9', position: 'absolute', top: '30px', left: '123px', fontWeight: '100', cursor: 'pointer' }}>hours</div>
                                                <div onClick={this.onClickDays} style={{ border: '1px solid #e9e9e9', position: 'absolute', top: '45px', left: '123px', fontWeight: '100', cursor: 'pointer' }}>days</div>
                                            </>}
                                        <span style={{ marginLeft: '20px' }}>before</span>
                                    </>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='scheduler-foot'>
                    <button onClick={this.onClickSubmit} style={{ backgroundColor: this.props.setColor }}>Add Event</button>
                </div>
            </div>
        )
    }
};
export default AddScheduler