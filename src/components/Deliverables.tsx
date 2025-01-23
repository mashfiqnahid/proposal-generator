import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateDeliverable } from '../features/proposalSlice';

const Deliverables: React.FC = () => {
  const dispatch = useAppDispatch();
  const deliverables = useAppSelector((state) => state.proposal.deliverables);

  return (
    <div>
      <h3>Deliverables</h3>
      {deliverables.map((deliverable, index) => (
        <input
          key={index}
          type="text"
          value={deliverable}
          onChange={(e) =>
            dispatch(updateDeliverable({ index, value: e.target.value }))
          }
        />
      ))}
    </div>
  );
};

export default Deliverables;
