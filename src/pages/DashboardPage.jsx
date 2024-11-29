import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { toast } from "sonner"; // Jika menggunakan Sonner untuk toast
import { BsPlus } from 'react-icons/bs';
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs';
import vipImage from '../assets/images/vip.jpg';
import cat from '../assets/images/cat.jpg';
import vipImage2 from '../assets/images/vip2.jpg';

const DashboardPage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [showModal, setShowModal] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState({
        date: '',
        room: 'VIP 1', // Default value untuk dropdown
        cost: '',
        purpose: ''
    });
    const [editRoomIndex, setEditRoomIndex] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate("/login");
        }
    }, [navigate]);

    const formatDate = (date) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        };
        return new Date(date).toLocaleDateString("id-ID", options);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRoom({
            ...newRoom,
            [name]: value
        });
    };

    const handleSave = () => {
        if (editRoomIndex !== null) {
            const updatedRooms = rooms.map((room, index) =>
                index === editRoomIndex ? newRoom : room
            );
            setRooms(updatedRooms);
            toast.success('Ruangan berhasil diperbarui!');
            setEditRoomIndex(null);
        } else {
            setRooms([...rooms, newRoom]);
            toast.success('Reservasi berhasil disimpan!');
        }
        setNewRoom({ date: '', room: 'VIP 1', cost: '', purpose: '' });
        setShowModal(false);
    };

    const handleDelete = (index) => {
        const updatedRooms = rooms.filter((_, i) => i !== index);
        setRooms(updatedRooms);
        toast.success('Reservasi berhasil dihapus!');
    };

    const handleEdit = (index) => {
        setNewRoom(rooms[index]);
        setEditRoomIndex(index);
        setShowModal(true);
    };

    const getRoomImage = (room) => {
        return room === 'VIP 1' ? vipImage : vipImage2;
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-3 border-bottom fw-bold">Dashboard</h1>
            <Row className="mb-4">
                <Col md={10}>
                    <Card className="h-100 justify-content-center">
                        <Card.Body>
                            <h4>Selamat datang,</h4>
                            <h1 className="fw-bold display-6 mb-3">{user?.username}</h1>
                            <p className="mb-0">Kamu sudah login sejak:</p>
                            <p className="fw-bold lead mb-0">{formatDate(user?.loginAt)}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card>
                        <Card.Body>
                            <p>Bukti sedang ngantor:</p>
                            <img src={cat} className="img-fluid" alt="Kocheng" />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h3 className="mt-4">Daftar Reservasi Ruangan</h3>
            <div className="mt-4">
                <p>
                    Saat ini terdapat <strong>{rooms.length}</strong> reservasi yang akan datang.
                </p>
            </div>
            <Button variant="success" onClick={() => setShowModal(true)} className="mb-4">
                <BsPlus className="mr-2" /> Tambah Ruangan
            </Button>

            <div>
                {rooms.map((room, index) => (
                    <div key={index} className="border p-3 mb-3">
                        <Row>
                            <Col md={2}>
                                <img src={getRoomImage(room.room)} className="img-fluid" alt={`Ruangan ${room.room}`} />
                            </Col>
                            <Col md={10}>
                                <h5>{room.room}</h5>
                                <p>Untuk Keperluan: </p>
                                <p><strong>{room.purpose}</strong></p>
                                <hr />
                                <Row>
                                    <Col md={6}>
                                        <p><strong>Tanggal Penggunaan:</strong> {room.date} <strong> Harga:</strong> {room.cost}</p>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col md={6} className="d-flex gap-1">
                                        <Button variant="danger" onClick={() => handleDelete(index)}><BsFillTrashFill className="me-2" /> Hapus Ruangan</Button>
                                        <Button variant="primary" onClick={() => handleEdit(index)}><BsPencilFill className="me-2" /> Edit Ruangan</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                ))}
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editRoomIndex !== null ? "Edit Ruangan" : "Tambah Ruangan"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDate">
                            <Form.Label>Tanggal Pemesanan</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={newRoom.date}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formRoom">
                            <Form.Label>Ruangan yang Dipesan</Form.Label>
                            <Form.Control
                                as="select"
                                name="room"
                                value={newRoom.room}
                                onChange={handleInputChange}
                            >
                                <option value="VIP 1">VIP 1</option>
                                <option value="VIP 2">VIP 2</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formCost">
                            <Form.Label>Biaya Pemesanan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Biaya Pemesanan"
                                name="cost"
                                value={newRoom.cost}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPurpose">
                            <Form.Label>Tujuan Penggunaan</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Tujuan Penggunaan"
                                name="purpose"
                                value={newRoom.purpose}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        {editRoomIndex !== null ? "Simpan" : "Simpan"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default DashboardPage;