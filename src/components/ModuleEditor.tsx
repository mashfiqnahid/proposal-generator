import React from 'react';
import { updateModule } from '../features/proposalSlice';
import { RootState } from '../store/store';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const ModuleEditor: React.FC = () => {
    const dispatch = useAppDispatch();
    const modules = useAppSelector((state: RootState) => state.proposal.modules);

    return (
        <div>
            <h3>Modules</h3>
            {modules.map((module, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={module.name}
                        onChange={(e) =>
                            dispatch(updateModule({ index, module: { ...module, name: e.target.value } }))
                        }
                    />
                    <textarea
                        value={module.description}
                        onChange={(e) =>
                            dispatch(updateModule({ index, module: { ...module, description: e.target.value } }))
                        }
                    />
                    {module.hours.map((item, index) => (<input
                        type="number"
                        value={item.hours}
                        onChange={(e) => {

                            // const hours = module.hours
                            // hours
                            // dispatch(
                            //     updateModule({
                            //         index,
                            //         module: { ...module, hours: { ...module.hours, frontend: +e.target.value } },
                            //     })
                            // )
                        }
                        }
                    />))}
                </div>
            ))}
        </div>
    );
};

export default ModuleEditor;
