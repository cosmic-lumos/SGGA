const url = "http://localhost:8080/api/rooms";

const sendCreateRoom = async (name, fourAmount, sixAmount) => {
    const data = {
        host: {
            name: name
        },
        table4: fourAmount,
        table6: sixAmount
    };
    const fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    };

    const roomInfo = await fetch(url, fetchData)
        .catch(response => {
            throw new Error(`error: ${response}`);
        })
        .then(response => response.json());

    return roomInfo;
}

export default sendCreateRoom;