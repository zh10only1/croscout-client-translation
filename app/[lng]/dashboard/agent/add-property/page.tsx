
import React from 'react';
import AddPropertyForm from './components/AddPropertyForm';

const AddProperty = ({ params: { lng } }: { params: { lng: string } }) => {
    return (
        <div>
            <AddPropertyForm lng={lng} />
        </div>
    );
};

export default AddProperty;
