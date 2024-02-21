
const EmptyPage = ({ children }: any) => {
    return (
        <div className='min-h-screen px-3 flex-center'>
            <h1 className='md:text-4xl text-2xl font-bold text-white-50'>{children}</h1>
        </div>
    );
};

export default EmptyPage;