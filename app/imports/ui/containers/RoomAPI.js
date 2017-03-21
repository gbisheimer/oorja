import status from '../components/room/constants/status';

class RoomAPI {
  constructor(room) {
    // room will be directly accessible to whoever has a refernce to
    // this object, since there are no private properties in jaaavaascriipptt..
    this.room = room;
    this.messenger = room.messenger;
    this.activityListner = room.activityListner;
  }

  primaryDataStreamConnected() {
    return this.room.state.primaryDataStreamStatus === status.CONNECTED;
  }

  getUserId() {
    return this.room.props.roomUserId;
  }

  sendMessage(message) {
    if (message.local) {
      this.messenger.recieve(message);
      return true;
    }
    if (!this.primaryDataStreamConnected) {
      return false;
    }
    this.messenger.send(message);
    return true;
  }

  addMessageHandler(tabId, handler) {
    /*
        tabId, handler
    */
    this.messenger.addMessageHandler(tabId, handler);
  }

  removeMessageHandler(tabId, handler) {
    /*
        tabId, handlerToBeRemoved
    */
    this.messenger.removeMessageHandler(tabId, handler);
  }

  addActivityListner(activity, listner) {
    this.room.activityListner.listen(activity, listner);
  }

  removeActivityListner() {

  }

  resizeStreamContainer(size) {
    this.room.setState({
      ...this.room.state,
      streamContainerSize: size,
    });
  }
}

export default RoomAPI;