function Header() {
    return (
        <>
            <div className="text-center">
                <img
                    src="/iscte.avif" // (1)
                    width="600"
                    alt="ISCTE"
                    className="img-thumbnail"
                    style={{ marginTop: "20px" }} // (2)
                />
                <h2>Integração de Django com React</h2>
            </div>
        </>
    );
}

export default Header;