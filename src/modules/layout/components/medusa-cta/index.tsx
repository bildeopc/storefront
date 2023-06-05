const MedusaCTA = () => {
  return (
    <div className="py-4 flex justify-center items-center w-full">
      <div className="content-container flex justify-center flex-1">
        <a href="https://bildeopc.com" target="_blank" rel="noreferrer">
          <PoweredBy />
        </a>
      </div>
    </div>
  )
}

const PoweredBy = () => {
  return (
    <>
      <p className="text-gray-700 text-center text-sm">Secured by BildeoPC</p>
    </>
  )
}

export default MedusaCTA
