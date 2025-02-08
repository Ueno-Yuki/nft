import Image from 'next/image'

export default function Home() {
  return (
    <div className='h-4/5'>
      <h1 className='mx-auto mt-3 text-center text-4xl'>Let&apos;s Mint Generative NFT</h1>
      <p className='mt-2 mb-3 font-bold-500 text-center'>contract address: </p>
      <aside className="w-full md:w-1/3 flex flex-col items-center px-3 md:pl-6 mx-auto">
        <div className="bg-white shadow-md rounded-xl p-4 mb-6 mt-4">
          <h3 className="font-bold text-gray-900 mb-2 text-center">発行状況： </h3>
          <p className="text-gray-600 my-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>

          <form className="mx-auto mb-2">
            <div className="flex justify-center my-3">
              <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="dark:border-gray-600 border border-gray-300 rounded-s-lg p-3 h-11">
                <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                </svg>
              </button>
              <input type="text" id="quantity-input" data-input-counter className="border-y border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
              <button type="button" id="increment-button" data-input-counter-increment="quantity-input" className="dark:border-gray-600 border border-gray-300 rounded-e-lg p-3 h-11">
                  <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                  </svg>
              </button>
            </div>
            <div className='flex justify-center'>
              <input type="button" name="mint_submit" id='mint_submit' value="Mint NFT" className='w-full bg-orange-300 px-3 py-3 rounded-md' />
            </div>
          </form>
        </div>
      </aside>

      <div className='flex justify-center my-3'>
        <button className='border border-green-400 bg-green-400 rounded-md p-3'>NFTを確認する</button>
      </div>
    </div>
  )
}
