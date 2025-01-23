import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateTitle } from '../features/proposalSlice';

const TitleEditor: React.FC = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector((state) => state.proposal.title);

  return (
    <div>
      <h3>Title</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => dispatch(updateTitle(e.target.value))}
      />
    </div>
  );
};

export default TitleEditor;
