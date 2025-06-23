import styled from 'styled-components';

export const ModalOverlay = styled.div`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  position: fixed;
  z-index: 1000;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.18);
  align-items: center;
  justify-content: center;
`;
export const ModalBox = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(25, 118, 210, 0.12);
  width: 95vw;
  max-width: 340px;
  padding: 1.5rem 1.2rem;
  position: relative;
`;
export const Title = styled.h2`
  color: #1976d2;
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
`;
export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.7rem;
  border: 1.5px solid #1976d2;
  border-radius: 6px;
  font-size: 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
`;
export const Select = styled.select`
  width: 100%;
  padding: 0.5rem 0.7rem;
  border: 1.5px solid #1976d2;
  border-radius: 6px;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #1976d2;
  font-weight: 600;
`;
export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem 0.7rem;
  border: 1.5px solid #1976d2;
  border-radius: 6px;
  font-size: 1rem;
  margin-bottom: 1rem;
  resize: none;
  box-sizing: border-box;
`;
export const Row = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;
export const Button = styled.button`
  background: ${({ primary }) => (primary ? '#1976d2' : '#fff')};
  color: ${({ primary }) => (primary ? '#fff' : '#1976d2')};
  border: 1.5px solid #1976d2;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.4rem 1.1rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  &:hover { background: ${({ primary }) => (primary ? '#1565c0' : '#e3f0fd')}; }
`;
export const ExpenseList = styled.div`
  max-height: 180px;
  overflow-y: auto;
  margin-bottom: 1rem;
`;
export const ExpenseItem = styled.div`
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #e3f0fd;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ExpenseItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;
export const ExpenseInfo = styled.div`
  color: #1976d2;
  font-size: 0.98rem;
  font-weight: 600;
`;
export const ExpenseDesc = styled.div`
  color: #222;
  font-size: 0.97rem;
  font-weight: 400;
`;
export const EmptyText = styled.div`
  color: #aaa;
  font-size: 0.97rem;
  margin-bottom: 1rem;
`;
export const EditButton = styled.button`
  font-size: 0.95rem;
  padding: 0.2rem 0.7rem;
  background: #fff;
  border: 1.5px solid #1976d2;
  color: #1976d2;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: background 0.15s;
  &:hover { background: #e3f0fd; }
`;
