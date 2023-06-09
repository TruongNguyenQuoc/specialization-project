import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

import AddNewBoard from 'components/Common/AddNewBoard'
import BoardLogo from 'images/boards.svg'
import APIService from 'api/ApiService'
import { USER_DATA, LOGOUT, ACCESS_TOKEN } from 'ultil/constants'
import './BoardPage.scss'

function BoardPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [listBoard, setListBoard] = useState([])
    const account = JSON.parse(localStorage.getItem(USER_DATA))

    const logout = () => {
        dispatch({ type: LOGOUT })
        navigate('/login')
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN))
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }
        APIService.getBoardByAccount(account.id)
            .then((result) => {
                const { status, data } = result
                if (status === 200) {
                    setListBoard(data.data)
                }
            })
            .catch(() => {
                navigate('/login')
            })
    }, [location])

    const onSaveBoard = (values) => {
        const newBoard = {
            ...values,
            destroy: false,
            accountId: account.id,
        }
        APIService.saveBoard(JSON.stringify(newBoard)).then((result) => {
            const { status, data } = result
            if (status === 200) {
                navigate(`/board/${data.data.id}`)
            }
        })
    }

    const handleShowAddNewBoard = () => {}

    return (
        <div className="home-container">
            <Container>
                <Row>
                    <Col className="col-lg-3">
                        <div className="home-left-sidebar-container">
                            <ul className="board-list">
                                <div className="sidebar-content d-flex">
                                    <div className="content-title">
                                        <span>Danh Sách Bảng</span>
                                    </div>
                                    <AddNewBoard
                                        onSaveBoard={onSaveBoard}
                                    ></AddNewBoard>
                                </div>
                                {listBoard.toString() &&
                                    listBoard.map((board, index) => (
                                        <li
                                            key={index}
                                            className="boards-item mb-1"
                                        >
                                            <Link
                                                to={`/board/${board.id}`}
                                                className="boards-item-link"
                                            >
                                                <div className="boards-image">
                                                    <img
                                                        src={BoardLogo}
                                                        alt="board logo"
                                                    />
                                                </div>
                                                <span>{board.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </Col>
                    <Col className="col-lg-9">
                        <div className="all-boards">
                            <div className="board-page">
                                <h3 className="board-page-header">
                                    Bảng của bạn
                                </h3>
                                <div className="board-page-section">
                                    <ul className="board-page-section-list p-0">
                                        {listBoard.toString() !==
                                        [].toString() ? (
                                            listBoard.map((board, index) => (
                                                <li
                                                    key={index}
                                                    className="boards-page-section-list-item"
                                                >
                                                    <Link
                                                        to={`/board/${board.id}`}
                                                        className="board-title"
                                                    >
                                                        <div className="board-title-detail">
                                                            <span className="board-title-detail-name">
                                                                {board.title}
                                                            </span>
                                                            <div className="board-tile-detail-sub-container"></div>
                                                        </div>
                                                    </Link>
                                                    <div className="board-bottom u-clearfix"></div>
                                                </li>
                                            ))
                                        ) : (
                                            <li
                                                className="boards-page-section-list-item"
                                                onClick={handleShowAddNewBoard}
                                            >
                                                <div className="board-tile mod-add">
                                                    <span>
                                                        Create new board
                                                    </span>
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BoardPage
