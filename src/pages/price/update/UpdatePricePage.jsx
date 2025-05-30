import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import { notifyError, notifyInfo } from '../../../utils/notify';
import { getPriceById, loadAllCategory, updatePriceApi } from '../../../services/price';
import { getCurrentUserDetail } from '../../../auth';
import { useNavigate, useParams } from 'react-router-dom';
import Dropdown from '../../../components/ui/Dropdown';
import PriceInfo from '../create/Createprice';

const UpdatePricePage = () => {
  const [priceData, setPriceData] = useState({
    province: '',
    baseFare: '',
    perKmRate: '',
    categoryId: ''
  });

  const { id } = useParams();
  const [categoryId, setCategoryId] = useState('');
  const [userId, setUserId] = useState(null);
  const [catOptions, setCatOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceDataById, setPriceDataById] = useState(false);
  const [priceCreated, setPriceCreated] = useState(false);

  const navigate = useNavigate();

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {


    const fetchInitialData = async () => {
      try {
        const data = await getPriceById(id);
        setPriceDataById(data || null);
      } catch {
        notifyError("Failed to fetch user details");
      }

      try {
        const userDetails = await getCurrentUserDetail();
        setUserId(userDetails?.id || null);
      } catch {
        notifyError("Failed to fetch user details");
      }

      try {
        const categories = await loadAllCategory();
        const options = categories.map((item) => ({
          label: item.categoryTitle,
          value: item.categoryId
        }));
        setCatOptions(options);
      } catch {
        notifyError("Failed to load categories");
      }
    };

    fetchInitialData();
  }, []);


  useEffect(() => {
    if (priceDataById) {
      setPriceData({
        province: priceDataById.province || '',
        baseFare: priceDataById.baseFare || '',
        perKmRate: priceDataById.perKmRate || '',
      });
      setCategoryId(priceDataById.category?.categoryId || '');

    }
  }, [priceDataById]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || priceCreated) return;

    if (!categoryId) {
      notifyInfo("Please select a Category.");
      return;
    }

    const emptyFields = Object.entries(priceData)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      notifyInfo(`Please fill in all fields: ${emptyFields.join(', ')}`);
      return;
    }

    try {
      setLoading(true);

      const requestBody = {
        ...priceData,
        category: {
          categoryId: parseInt(categoryId)
        }
      };


      await updatePriceApi(id, requestBody);
      setPriceCreated(true);
      navigate("/admin/prices");
    } catch {
      notifyError("Something went wrong, but the price might be created. Redirecting...");
      navigate("/admin/prices");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1">
      <div className="border border-black rounded-[10px] p-6 min-h-[350px]">
        <h1 className="text-[20px] font-bold text-black text-center mb-6">
          Price Creation
        </h1>
        <div className="h-2 bg-[#f04f18] border border-[#f04f18] rounded-[4px] mb-[10px]" />

        <form onSubmit={handleSubmit}>
          <PriceInfo formData={priceData} handleChange={handlePriceChange} />

          <Dropdown
            label="Category"
            name="categoryId"
            options={catOptions} // example: [{ label: "Tech", value: 1 }, ...]
            value={categoryId}   // Should be just: 1, "1", etc
            onChange={handlePriceChange} // Not the whole object!
            required
          />

          <hr className="border-t border-[#110d0c7f] my-4" />
          <div className="flex justify-end">
            <Button
              className="w-[120px] h-[39px] flex items-center bg-[#f04f18] justify-center"
              type="submit"
              variant="secondary"
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePricePage;
