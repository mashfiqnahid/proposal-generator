import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateOverview } from '../features/proposalSlice';

const ProposalOverview: React.FC = () => {
  const dispatch = useAppDispatch();
  const overview = useAppSelector((state) => state.proposal.overview);

  return (
    <div>
      <h3>Overview</h3>
      <textarea
        value={overview}
        onChange={(e) => dispatch(updateOverview(e.target.value))}
      />
    </div>
  );
};

export default ProposalOverview;
