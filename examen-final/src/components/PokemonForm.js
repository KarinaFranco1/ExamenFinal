import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Row, Col } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;


function PokemonForm (props) {

    // const [task, setTask] = useState({});
    const [pokemons, setPokemons] = useState([]);
    const [form] = Form.useForm();

    // Ejecutado solo al renderizar el componente por primera vez
    useEffect(() => {

        if (props.match.params.typeId) {
            //sirve para editar y se hace esa llamada para obtener el objeto
            axios.get('https://api.pokemontcg.io/v1/cards?subtype=Basic' + props.match.params.pokemonId)
                .then((res) => {
                    console.log(res.data);
                    form.setFieldsValue(res.data);
                });
        }
    }, []);
    const submit = (pokemonForm) => {
        //edicion
        if (props.match.params.pokemonId) {
            axios.put('https://api.pokemontcg.io/v1/cards?subtype=Basic' + props.match.params.pokemonId, pokemonForm)
                .then((res) => {
                    console.log(res);
                    props.history.push('/card');
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        else {
            axios.post('https://api.pokemontcg.io/v1/cards?subtype=Basic', PokemonForm)
                .then((res) => {
                    console.log(res);
                    props.history.push('/card');
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    const onFinish = values => {
        console.log('Success:', values);
        submit(values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            style={{ width: '60%', margin: '0 auto' }}
            form={form}
            layout="vertical"
            name="basic"
            //initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Page"
                name="page"
                rules={[{ required: true, message: 'Required!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Total"
                name="total"
                rules={[{ required: true, message: 'Required!' }]}
            >
                <Form.Item
                    label="Total Pages"
                    name="total_pages"
                    rules={[{ required: true, message: 'Required!' }]}
                >
                </Form.Item>
                <Input />
            </Form.Item>
            <Form.Item
                label="Data"
                name="data"
                rules={[{ required: true, message: 'Required!' }]}
            >
                <Select style={{ width: '100%' }} onChange={(value) => console.log('handleChangeSelect -> ' + value)}>
                    {
                        pokemons.map(pokemon => {
                            return (
                                <Option key={pokemon.id} value={pokemon.id}>{pokemon.name}</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Row>
                    <Col span={12}>
                        <Button type="default" onClick={() => props.history.push(`/card`)}>
                            Cancel
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form.Item>

        </Form>

    )
}
export default PokemonForm;