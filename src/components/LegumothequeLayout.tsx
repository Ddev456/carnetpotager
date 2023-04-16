import React, { type PropsWithChildren } from 'react';

const LegumothequeLayout = ({ children }: PropsWithChildren) => {

    return (
    <div className="w-full text-sm text-left text-grayscale max-h-[35rem] sm:max-h-[50rem] overflow-y-scroll">
        {children}
    </div>
  );
};

export default LegumothequeLayout;