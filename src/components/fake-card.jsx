import { Card, Modal } from 'antd';
import { useState } from 'react';

export const CardList = ({ PokemonLists, loadMorePokemon }) => {
    // State to keep track of the selected card
    const [visible, setVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);


    return (
        <div>
            {PokemonLists.map(card => (
                <Card
                    key={card.id}
                    onClick={() => {
                        setSelectedCard(card);
                        setVisible(true);
                    }}
                >
                    {card.title}
                </Card>
            ))}
            <Modal
                visible={visible}
                onCancel={() => setVisible(false)}
                onOk={() => setVisible(false)}
                maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                centered
                destroyOnClose
            >
                <div>
                    {selectedCard && selectedCard.content}
                </div>
            </Modal>
        </div>
    );
};






