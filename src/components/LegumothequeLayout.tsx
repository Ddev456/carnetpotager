import React, { type PropsWithChildren } from 'react';

const LegumothequeLayout = ({ children }: PropsWithChildren) => {

    return (
    <div className="w-full text-sm text-left text-grayscale">
        {children}
    </div>
  );
};

export default LegumothequeLayout;