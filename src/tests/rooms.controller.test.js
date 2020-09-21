const assert = require('assert')
const proxyquire = require('proxyquire')

const {
    roomsMock,
    roomIdTest,
    roomMockAttributes,
} = require('../utils/mocks/rooms')

const roomsControllerMock = require('../utils/mocks/roomsController')
const roomsControllerSearchMock = require('../utils/mocks/roomsSearch')

describe('Controller - Rooms', () => {
    const roomsController = proxyquire('../components/rooms/controller', {
        './schema': roomsControllerMock
    })

    const roomControllerSearch = proxyquire('../components/rooms/controller', {
        './schema': roomsControllerSearchMock
    })

    describe('When readRoom function is called', async () =>{
        it('Should call find function', async () => {
            await roomsController.readRooms({})
            assert.strictEqual(roomsControllerMock.readRoomsStub.called, true)
        })
        it('Should return a rooms array', async () =>{
            const rooms = await roomsController.readRooms({})
            assert.deepStrictEqual(rooms, roomsMock)
        })
    })

    describe('When readOneRoom function is called', async () => {
        it('Should call findById function', async () => {
            await roomsController.readOneRoom(roomIdTest)
            assert.strictEqual(roomsControllerMock.readOneRoomStub.called, true)
        })
        it('Should return the room\'s data', async () => {
            const room = await roomsController.readOneRoom(roomIdTest)
            assert.deepStrictEqual(room, roomsMock[0])
        })
    })

    describe('When createRoom function is called', async () => {
        it('Should call create function', async () => {
            await roomsController.createRoom(roomMockAttributes)
            assert.strictEqual(roomsControllerMock.createRoomStub.called, true)
        })
        it('Should return the new room\'s data', async () => {
            const newRoom = await roomsController.createRoom(roomMockAttributes)
            assert.deepStrictEqual(newRoom, roomsMock[1])
        })
    })

    describe('When updateRoom function is called', async () => {
        it('Should call findByIdAndUpdate function', async () => {
            await roomsController.updateRoom(roomIdTest, roomMockAttributes)
            assert.strictEqual(roomsControllerMock.updateRoomStub.called, true)
        })
    })

    describe('When deleteRoom function is called', async () => {
        it('Should call findByIdAndUpdate function', async () => {
            await roomsController.deleteRoom(roomIdTest)
            assert.strictEqual(roomsControllerMock.updateRoomStub.called, true)
        })
    })

    describe('When searchRoomByCity function is called', async () => {
        it('Should call find function', async () => {
            await roomControllerSearch.searchRoomByCity('bogota')
            assert.strictEqual(roomsControllerSearchMock.searchRoomByCityStub.called, true)
        })
    })
})